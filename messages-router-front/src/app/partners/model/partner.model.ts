export interface Partner {
  id: number | null;
  alias: string;
  type: string;
  direction: PartnerDirectionEnum;
  application: string;
  flowType: PartnerFlowTypeEnum;
  description: string;
}

export enum PartnerDirectionEnum {
  INBOUND='INBOUND',
  OUTBOUND= 'OUTBOUND'
}

export enum PartnerFlowTypeEnum {
  MESSAGE  = 'MESSAGE',
  ALERTING = 'ALERTING',
  NOTIFICATION = 'NOTIFICATION',
}

