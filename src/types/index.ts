import type { Refund } from './Refund';
import type { PaymentIntent } from './PaymentIntent';
import type { Reader } from './Reader';
import type { SetupIntent } from './SetupIntent';

export * from './Reader';
export * from './SetupIntent';
export * from './PaymentIntent';
export * from './Refund';

export type InitParams = {
  logLevel?: LogLevel;
};

export type SetConnectionTokenParams = {
  token?: string;
  error?: string;
};

export type LogLevel = LogLevelIOS | LogLevelAndroid;
export type LogLevelIOS = 'none' | 'verbose';
export type LogLevelAndroid = 'none' | 'verbose' | 'error' | 'warning';

export type DiscoverReadersParams = {
  timeout?: number;
  simulated?: boolean;
  discoveryMethod: Reader.DiscoveryMethod;
};

export type GetLocationsParams = {
  limit?: number;
  endingBefore?: string;
  startingAfter?: string;
};

export type ConnectBluetoothReaderParams = {
  reader: Reader.Type;
  locationId?: string;
  autoReconnectOnUnexpectedDisconnect?: boolean;
};

export type ConnectUsbReaderParams = {
  reader: Reader.Type;
  locationId?: string;
  autoReconnectOnUnexpectedDisconnect?: boolean;
};

export type ConnectLocalMobileParams = {
  reader: Reader.Type;
  locationId?: string;
  onBehalfOf?: string;
  merchantDisplayName?: string;
  tosAcceptancePermitted?: boolean;
  autoReconnectOnUnexpectedDisconnect?: boolean;
};

export type ConnectHandoffParams = {
  reader: Reader.Type;
  locationId?: string;
};

export type LineItem = {
  displayName: string;
  quantity: number;
  amount: number;
};

export type Cart = {
  currency: string;
  tax: number;
  total: number;
  lineItems: LineItem[];
};

export type ConnectInternetReaderParams = {
  reader: Reader.Type;
  failIfInUse?: boolean;
};

export enum CommonError {
  Failed = 'Failed',
  Canceled = 'Canceled',
  Unknown = 'Unknown',
}

export type LocationStatus = 'notSet' | 'set' | 'unknown';

export type StripeError<T = CommonError> = {
  code: T;
  message: string;
};

export type InitializeResultType =
  | {
      reader?: Reader.Type;
      error?: undefined;
    }
  | { error: StripeError; reader?: undefined };

export type DiscoverReadersResultType = Promise<{
  error?: StripeError;
}>;

export type CancelDiscoveringResultType = Promise<{
  error?: StripeError;
}>;

export type ConnectReaderResultType =
  | {
      reader: Reader.Type;
      error?: undefined;
    }
  | { reader?: undefined; error: StripeError };

export type DisconnectReaderResultType = {
  error: StripeError;
};

export type RebootReaderResultType = {
  error: StripeError;
};

export type UpdateSoftwareResultType = {
  update?: Reader.SoftwareUpdate;
  error?: StripeError;
};

export interface Location {
  displayName?: string;
  id: string;
  livemode: boolean;
  address?: Address;
}

export interface Address {
  city?: string;
  country?: string;
  postalCode?: string;
  line1?: string;
  line2?: string;
  state?: string;
}

export type PaymentStatus =
  | 'notReady'
  | 'ready'
  | 'processing'
  | 'waitingForInput';

export type PaymentMethodType = 'cardPresent' | 'interacPresent' | 'card';

export interface Charge {
  id: string;
  amount: number;
  description: string;
  currency: string;
  status: string;
  paymentMethodDetails: PaymentMethodDetails;
}

export type CreatePaymentIntentParams = CreatePaymentIntentIOSParams & {
  amount: number;
  currency: string;
  setupFutureUsage?: 'off_session' | 'on_session';
  onBehalfOf?: string;
  transferDataDestination?: string;
  applicationFeeAmount?: number;
  stripeDescription?: string;
  statementDescriptor?: string;
  statementDescriptorSuffix?: string;
  receiptEmail?: string;
  customer?: string;
  transferGroup?: string;
  metadata?: Record<string, string>;
  paymentMethodOptions?: PaymentMethodOptions;
  captureMethod?: 'automatic' | 'manual';
  offlineBehavior: 'prefer_online' | 'require_online' | 'force_offline';
};

export type CreatePaymentIntentIOSParams = {
  paymentMethodTypes?: string[];
};

export type PaymentMethodOptions = {
  requestExtendedAuthorization?: boolean;
  requestIncrementalAuthorizationSupport?: boolean;
  requestedPriority: string;
};

export type CollectPaymentMethodParams = {
  paymentIntent: PaymentIntent.Type;
  skipTipping?: boolean;
  tipEligibleAmount?: number;
  updatePaymentIntent?: boolean;
  enableCustomerCancellation?: boolean;
  requestDynamicCurrencyConversion?: boolean;
};

export type CollectSetupIntentPaymentMethodParams = {
  customerConsentCollected?: boolean;
  enableCustomerCancellation?: boolean;
  setupIntent: SetupIntent.Type;
};

export type CreateSetupIntentParams = {
  customerId?: string;
};

export type PaymentIntentResultType =
  | {
      paymentIntent: PaymentIntent.Type;
      error?: undefined;
    }
  | {
      paymentIntent?: undefined;
      error: StripeError;
    }
  | {
      paymentIntent: PaymentIntent.Type;
      error: StripeError;
    };

export type SetupIntentResultType =
  | {
      setupIntent: SetupIntent.Type;
      error?: undefined;
    }
  | {
      setupIntent?: undefined;
      error: StripeError;
    };

export type GetLocationsResultType =
  | {
      locations: Location[];
      hasMore: boolean;
      error?: undefined;
    }
  | {
      locations?: undefined;
      hasMore?: undefined;
      error: StripeError;
    };

export type ClearReaderDisplayResultType = {
  error: StripeError;
};

export type CollectRefundPaymentMethodType = {
  error?: StripeError;
};

export type RefundParams = {
  chargeId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  refundApplicationFee?: boolean;
  reverseTransfer?: boolean;
  enableCustomerCancellation?: boolean;
};

export type CardPresentDetails = {
  last4: string;
  expMonth: string;
  expYear: string;
  cardholderName?: string;
  funding: string;
  brand: string;
  generatedCard?: string;
  receipt?: string;
  emvAuthData?: string;
  country?: string;
  preferredLocales: string[];
  issuer: string;
  iin: string;
  network: string;
  description: string;
  wallet: Wallet;
};

export type ReceiptDetails = {
  accountType: string;
  applicationCryptogram: string;
  applicationPreferredName: string;
  authorizationCode: string;
  authorizationResponseCode: string;
  cvm: string;
  dedicatedFileName: string;
  terminalVerificationResult: string;
  transactionStatusInformation: string;
};

export type Wallet = {
  type: string;
};

export type PaymentMethodDetails = {
  type: string;
  cardPresentDetails?: CardPresentDetails;
  interacPresentDetails?: CardPresentDetails;
};

export type ConfirmRefundResultType = {
  refund?: Refund.Props;
  error?: StripeError;
};

export type OfflineStatusDetails = {
  networkStatus: 'online' | 'offline' | 'unknown';
  offlinePaymentsCount: number;
  offlinePaymentAmountsByCurrency: { [key: string]: number };
};

export type OfflineStatus = {
  sdk: OfflineStatusDetails;
  reader?: OfflineStatusDetails;
};

export type ReaderEvent = 'cardInserted' | 'cardRemoved';

export type ConnectionStatus = 'notConnected' | 'connecting' | 'connected';

/**
 * @ignore
 */
export type EventResult<T> = {
  result: T;
};

export type UserCallbacks = {
  onUpdateDiscoveredReaders?(readers: Reader.Type[]): void;
  onFinishDiscoveringReaders?(error?: StripeError): void;
  onDidReportUnexpectedReaderDisconnect?(error?: StripeError): void;
  onDidReportAvailableUpdate?(update: Reader.SoftwareUpdate): void;
  onDidStartInstallingUpdate?(update: Reader.SoftwareUpdate): void;
  onDidReportReaderSoftwareUpdateProgress?(progress: string): void;
  onDidFinishInstallingUpdate?(result: UpdateSoftwareResultType): void;

  onDidRequestReaderInput?(input: Reader.InputOptions[]): void;
  onDidRequestReaderDisplayMessage?(message: Reader.DisplayMessage): void;

  onDidChangeConnectionStatus?(status: Reader.ConnectionStatus): void;
  onDidChangePaymentStatus?(status: PaymentStatus): void;

  onDidStartReaderReconnect?(): void;
  onDidSucceedReaderReconnect?(): void;
  onDidFailReaderReconnect?(): void;

  onDidChangeOfflineStatus?(status: OfflineStatus): void;
  onDidForwardPaymentIntent?(
    paymentIntent: PaymentIntent.Type,
    error: StripeError
  ): void;
  onDidForwardingFailure?(error?: StripeError): void;

  onDidDisconnect?(reason?: Reader.DisconnectReason): void;

  onDidUpdateBatteryLevel?(result: Reader.BatteryLevel): void;
  onDidReportLowBatteryWarning?(): void;
  onDidReportReaderEvent?(event: ReaderEvent): void;
};

export namespace PaymentMethod {
  export type Type = {
    id: string;
    customer: string;
    interacPresentDetails: CardPresentDetails;
    cardPresentDetails: CardPresentDetails;
    metadata?: Record<string, string>;
  };
}

export type PaymentMethodResultType =
  | {
      paymentMethod?: PaymentMethod.Type;
      error: undefined;
    }
  | {
      paymentMethod: undefined;
      error: StripeError;
    };

export type CollectInputsParameters = {
  collectInputs: Input[];
};

export type CollectInputsResults = {
  collectInputResults?: CollectInputResult[];
  error: StripeError;
};

export type Input = {
  inputType: 'EMAIL' | 'NUMERIC' | 'PHONE' | 'TEXT' | 'SELECTION' | 'SIGNATURE';
  description?: string;
  required: boolean;
  skipButtonText?: string;
  submitButtonText?: string;
  title: string;
  selectionButtons?: SelectionButton[];
  toggles?: Toggle[];
};

export type CollectInputResult = {
  skipped: boolean;
  email?: string;
  numericString?: string;
  phone?: string;
  selection?: string;
  signatureSvg?: string;
  text?: string;
  toggles?: ToggleResult[];
};

export type SelectionButton = {
  style: SelectionButtonStyle;
  text: string;
};

export enum SelectionButtonStyle {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

export type Toggle = {
  title: string;
  description: string;
  defaultValue: ToggleValue;
};

export enum ToggleValue {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

export enum ToggleResult {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
  SKIPPED = 'SKIPPED',
}

export type OfflineDetails = {
  storedAt: string;
  requiresUpload: boolean;
  cardPresentDetails: OfflineCardPresentDetails;
  amountDetails: AmountDetails;
};

export type OfflineCardPresentDetails = {
  brand: string;
  cardholderName: string;
  expMonth: number;
  expYear: number;
  last4: string;
  readMethod: string;
  receiptDetails: ReceiptDetails;
};

export type AmountDetails = {
  tip: Amount;
};

export type Amount = {
  amount: number;
};
