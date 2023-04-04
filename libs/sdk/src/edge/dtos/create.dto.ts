import {
  CacheSettings,
  DeliveryProtocol,
  OriginProtocolPolicy,
  OriginType,
} from 'libs/sdk/src/common/enum';

export class EdgeApplicationCreateDto {
  name: string;
  delivery_protocol: DeliveryProtocol;
  origin_type: OriginType;
  address: string;
  origin_protocol_policy: OriginProtocolPolicy;
  host_header: string;
  browser_cache_settings: CacheSettings;
  browser_cache_settings_maximum_ttl: number;
  cdn_cache_settings: CacheSettings;
  cdn_cache_settings_maximum_ttl: number;
}
