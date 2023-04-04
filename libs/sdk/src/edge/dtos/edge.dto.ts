import { DeliveryProtocol, TLSVersion } from 'libs/sdk/src/common/enum';

/**
 * Resposta enviada pela AZION | API REFERENCE V3
 * Obs:
 *  - O campo l2_caching não está presente na resposta do POST
 */
export class EdgeApplicationDto {
  id: string;
  name: string;
  delivery_protocol: DeliveryProtocol;
  http_port: number;
  https_port: number;
  minimum_tls_version: TLSVersion;
  active: boolean;
  debug_rules: boolean;
  application_acceleration: boolean;
  caching: boolean;
  device_detection: boolean;
  edge_firewall: boolean;
  edge_functions: boolean;
  image_optimization: boolean;
  load_balancer: boolean;
  raw_logs: boolean;
  l2_caching: boolean;
  web_application_firewall: boolean;
}
