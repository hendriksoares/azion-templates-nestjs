import { EdgeService } from 'libs/sdk/src';
import { Injectable, Logger } from '@nestjs/common';
import {
  CacheSettings,
  DeliveryProtocol,
  OriginProtocolPolicy,
  OriginType,
} from '@azion/sdk/common/enum';
import {
  EdgeApplicationCreateDto,
  EdgeApplicationUpdateDto,
} from '@azion/sdk/edge/dtos';

@Injectable()
export class WordpressService {
  constructor(private readonly edgeService: EdgeService) {}

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
      const update_edge_data: EdgeApplicationUpdateDto = {
        id: edge_app.id,
        application_acceleration: true,
      };
      edge_app = await this.edgeService.update(update_edge_data);
    } catch (err) {
      const error = Object.values(err.response.data)[0];
      Logger.error(error, 'WordpressService');
    }
  }
}
