import { EdgeService } from 'libs/sdk/src';
import { Injectable, Logger } from '@nestjs/common';
import {
  CacheSettings,
  CacheStatus,
  DeliveryProtocol,
  OriginProtocolPolicy,
  OriginType,
  RulesPhase,
} from '@azion/sdk/common/enum';
import {
  EdgeApplicationCreateDto,
  EdgeApplicationUpdateDto,
} from '@azion/sdk/edge/dtos';
import { DomainService } from '@azion/sdk/domain/domain.service';
import { DomainCreateDto } from '@azion/sdk/domain/dtos';
import { CacheService } from '@azion/sdk/cache/cache.service';
import { set_cdn_cache_override } from '@azion/sdk/cache/helpers/helpers';
import { OriginsService } from '@azion/sdk/origins/origins.service';
import { RulesService } from '@azion/sdk/rules/rules.service';
import {
  set_by_pass_to_path,
  set_cache_to_images,
  set_cache_to_static,
} from '@azion/sdk/rules/helpers/helpers';

@Injectable()
export class WordpressService {
  constructor(
    private readonly edgeService: EdgeService,
    private readonly domainService: DomainService,
    private readonly cacheService: CacheService,
    private readonly originService: OriginsService,
    private readonly rulesService: RulesService,
  ) {}

  /**
   * Wordpress Template
   * This template configures a WordPress source on azion as an edge application
   * Actions:
   *  - Create a edge application;
   *  - Create a azion domain;
   *  - Set query string parameters (p & page_id) to default cache;
   *  - Create new rules engine to images and static files;
   *  - Create new rules engine 'by pass' administrative routes (/wp*);
   */
  async run(): Promise<void> {
    Logger.debug('Initializing wordpress template...', 'WordpressService');

    try {
      /** 1. Create a edge application */
      Logger.debug('Creating new edge application ...', 'WordpressService');
      const create_edge_data: EdgeApplicationCreateDto = {
        name: process.env.AZION_APP_NAME,
        delivery_protocol: DeliveryProtocol.HTTPS,
        origin_type: OriginType.SINGLE_ORIGIN,
        address: process.env.AZION_ADDRESS,
        origin_protocol_policy: OriginProtocolPolicy.PRESERVE,
        host_header: process.env.AZION_HOST_HEADER,
        browser_cache_settings: CacheSettings.OVERRIDE,
        browser_cache_settings_maximum_ttl: 20,
        cdn_cache_settings: CacheSettings.HONOR,
        cdn_cache_settings_maximum_ttl: 300,
      };
      let edge_app = await this.edgeService.create(create_edge_data);

      /** 2. Set edge application acceleration */
      Logger.debug(
        'Setting acceleration edge application ...',
        'WordpressService',
      );
      const update_edge_data: EdgeApplicationUpdateDto = {
        id: edge_app.id,
        application_acceleration: true,
      };
      edge_app = await this.edgeService.update(update_edge_data);

      Logger.debug(
        'Creating new domain to edge application ...',
        'WordpressService',
      );
      const domain_create_data: DomainCreateDto = {
        name: process.env.AZION_APP_NAME,
        cnames: [],
        cname_access_only: false,
        digital_certificate_id: null,
        edge_application_id: edge_app.id,
        is_active: true,
      };
      const domain = await this.domainService.create(domain_create_data);

      /** 4. setting some cache rules  */
      Logger.debug(
        'Setting the default cache rule with query parameters ...',
        'WordpressService',
      );
      const default_cache = await this.cacheService.find_by_edge(edge_app.id);

      await this.cacheService.update(edge_app.id, default_cache[0].id, {
        cache_by_query_string: CacheStatus.WHITELIST,
        query_string_fields: ['p\r', 'page_id'],
      });

      const caches_promises = [];
      caches_promises.push(
        this.cacheService.create(set_cdn_cache_override(1296000), edge_app.id),
        this.cacheService.create(set_cdn_cache_override(31536000), edge_app.id),
      );
      const caches = await Promise.all(caches_promises);

      /** 5. configure the cache rules  */
      Logger.debug(
        'Setting the engine rules and add by pass to admin routes ...',
        'WordpressService',
      );
      const origins = await this.originService.find_by_edge(edge_app.id);
      const rules_promises = [];
      rules_promises.push(
        this.rulesService.create(
          set_cache_to_static(caches[0].id),
          RulesPhase.REQUEST,
          edge_app.id,
        ),
        this.rulesService.create(
          set_cache_to_images(caches[1].id),
          RulesPhase.REQUEST,
          edge_app.id,
        ),
      );
      await Promise.all(rules_promises);

      await this.rulesService.create(
        set_by_pass_to_path(origins[0].origin_id, '/wp'),
        RulesPhase.REQUEST,
        edge_app.id,
      );

      Logger.debug(
        'Azion wordpress configuration finish !! ...',
        'WordpressService',
      );
      Logger.debug(
        `Soon, you can access your edge application in: ${domain.domain_name}`,
        'WordpressService',
      );
      Logger.debug(
        `Remember to change the default base url in Wordpress database to new domain`,
        'WordpressService',
      );
    } catch (err) {
      const error = Object.values(err.response.data)[0];
      Logger.error(error, 'WordpressService');
    }
  }
}
