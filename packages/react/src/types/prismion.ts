/**
 * Prismion/Board domain types
 * Migrated from PRISMORA-v2 for use in MSQDX Board/Prismion components.
 */

export type ID = string;
export type UserID = ID;
export type BoardID = ID;
export type PrismionID = ID;
export type ConnectorID = ID;

export type Role = 'owner' | 'editor' | 'commenter' | 'viewer';

export interface Member {
  userId: UserID;
  role: Role;
  displayName: string;
  avatarUrl?: string;
}

export interface BoardSettings {
  gridVisible: boolean;
  snapToGrid: boolean;
  background: 'dots' | 'grid' | 'plain';
  theme: 'light' | 'dark' | 'system';
}

export interface CanvasSettings {
  backgroundColor: string;
  patternColor: string;
  patternSize: number;
  background: 'dots' | 'grid' | 'plain';
}

export interface Board {
  id: BoardID;
  shareId: string;
  title: string;
  description?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  canvasSettings?: CanvasSettings;
  prismions?: Prismion[];
  connections?: Connection[];
  participants?: BoardParticipant[];
}

export type ParticipantRole = 'OWNER' | 'EDITOR' | 'VIEWER';

export interface BoardParticipant {
  id: string;
  boardId: string;
  userId?: string;
  userName: string;
  userColor?: string;
  isActive: boolean;
  lastActiveAt: string;
  cursorX?: number;
  cursorY?: number;
  role: ParticipantRole;
  joinedAt: string;
}

export type PrismionState = 'draft' | 'active' | 'locked' | 'merged' | 'archived' | 'deleted';

export interface Tag {
  id: ID;
  label: string;
  colorToken: string;
}

export interface Port {
  id: ID;
  side: 'top' | 'right' | 'bottom' | 'left';
  capacity: 'single' | 'multi';
}

export interface Prismion {
  id: PrismionID;
  boardId: BoardID;
  title: string;
  prompt: string;
  colorToken: string;
  tags: Tag[];
  position: { x: number; y: number; zIndex: number };
  size: { w: number; h: number; minW: number; minH: number };
  ports: { top: Port; right: Port; bottom: Port; left: Port };
  state: PrismionState;
  createdBy: UserID;
  createdAt: string;
  updatedAt: string;
  revision: number;
  branchMeta?: BranchMeta;
  mergeMeta?: MergeMeta;
  kind?: PrismionKind;
  content?: PrismionContent;
  /** Optional card background color (hex or CSS color). Used by board UI for custom card color. */
  backgroundColor?: string;
}

export interface Connector {
  id: ConnectorID;
  boardId: BoardID;
  from: { prismionId: PrismionID; port: 'top' | 'right' | 'bottom' | 'left' };
  to: { prismionId: PrismionID; port: 'top' | 'right' | 'bottom' | 'left' };
  label?: string;
  /** Optional waypoints in board coordinates. Path = fromPort → waypoints → toPort; segments horizontal/vertical only. */
  waypoints?: { x: number; y: number }[];
  createdBy: UserID;
  createdAt: string;
}

export interface Connection {
  id: string;
  boardId: string;
  fromPrismionId: string;
  toPrismionId: string;
  fromPort?: string;
  toPort?: string;
  /** Arrow direction: forward = arrow at target, backward = arrow at source. @default "forward" */
  direction?: 'forward' | 'backward';
  label?: string;
  color?: string;
  strokeWidth: number;
  /** Optional waypoints in board coordinates. Path = fromPort → waypoints → toPort; segments horizontal/vertical only. If absent, path is computed orthogonally. */
  waypoints?: { x: number; y: number }[];
  pathData?: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface BranchMeta {
  parentPrismionId: PrismionID;
  branchId: ID;
  participants: UserID[];
}

export interface MergeMeta {
  mergedIntoPrismionId?: PrismionID;
  lastMergeAt?: string;
  lastMergeBy?: UserID;
  strategy?: MergeStrategy;
}

export type MergeStrategy = 'replace' | 'append' | 'patch' | 'custom';

export interface MergeProposal {
  id: ID;
  boardId: BoardID;
  sourcePrismionId: PrismionID;
  targetPrismionId: PrismionID;
  createdBy: UserID;
  createdAt: string;
  diff: DiffPayload;
  status: 'open' | 'accepted' | 'rejected' | 'superseded';
  reviewers: {
    userId: UserID;
    decision?: 'accept' | 'reject';
    comment?: string;
    decidedAt?: string;
  }[];
}

export interface DiffPayload {
  title?: { from: string; to: string };
  prompt?: { from: string; to: string };
  tags?: { add: Tag[]; remove: Tag[] };
  attachments?: { add: Attachment[]; remove: ID[] };
}

export interface Attachment {
  id: ID;
  type: 'text' | 'image' | 'video' | 'file' | 'link';
  url?: string;
  content?: string;
  meta?: Record<string, unknown>;
}

export interface Presence {
  userId: UserID;
  boardId: BoardID;
  cursor: { x: number; y: number };
  selectedPrismionIds: PrismionID[];
  colorToken: string;
  lastActiveAt: string;
}

export interface AuditLog {
  id: ID;
  boardId: BoardID;
  actorId: UserID;
  type: AuditEventType;
  payload: Record<string, unknown>;
  createdAt: string;
}

export type AuditEventType =
  | 'PrismionCreated'
  | 'PrismionUpdated'
  | 'PrismionMoved'
  | 'PrismionTagged'
  | 'ConnectorCreated'
  | 'ConnectorDeleted'
  | 'BranchStarted'
  | 'BranchJoined'
  | 'MergeProposed'
  | 'MergeAccepted'
  | 'MergeRejected'
  | 'BoardSettingsChanged';

export interface CanvasState {
  zoom: number;
  pan: { x: number; y: number };
  selectedPrismionIds: PrismionID[];
  selectedConnectorIds: ConnectorID[];
  isDragging: boolean;
  isConnecting: boolean;
  connectingFrom?: { prismionId: PrismionID; port: 'top' | 'right' | 'bottom' | 'left' };
}

export interface UIState {
  canvas: CanvasState;
  inspectorOpen: boolean;
  mergeDrawerOpen: boolean;
  contextMenu: {
    open: boolean;
    x: number;
    y: number;
    targetId?: ID;
    targetType?: 'prismion' | 'connector' | 'canvas';
  };
  commandPaletteOpen: boolean;
  presenterMode: boolean;
  presenterUserId?: UserID | null;
  presenterView?: { pan: { x: number; y: number }; zoom: number };
  followingPresenter?: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export type ClientToServerEvent =
  | 'presence:update'
  | 'prismion:create'
  | 'prismion:update'
  | 'prismion:move'
  | 'prismion:delete'
  | 'connector:create'
  | 'connector:delete'
  | 'merge:propose'
  | 'merge:review'
  | 'merge:accept'
  | 'merge:reject';

export type ServerToClientEvent =
  | 'presence:sync'
  | 'prismion:created'
  | 'prismion:updated'
  | 'prismion:moved'
  | 'prismion:deleted'
  | 'connector:created'
  | 'connector:deleted'
  | 'merge:proposed'
  | 'merge:updated';

export type Position = { x: number; y: number };
export type Size = { w: number; h: number };
export type PortSide = 'top' | 'right' | 'bottom' | 'left';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: ValidationError[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    cursor?: string;
    hasMore: boolean;
    total: number;
  };
}

export interface MergeContext {
  source: Prismion;
  target: Prismion;
  strategy: MergeStrategy;
  diff: DiffPayload;
}

export interface MergeResult {
  success: boolean;
  mergedPrismion?: Prismion;
  conflicts?: string[];
  auditLog?: AuditLog;
}

export type PrismionKind =
  | 'prompt'
  | 'tool'
  | 'result.text'
  | 'result.richtext'
  | 'result.image'
  | 'result.video'
  | 'result.link'
  | 'attachment.file'
  | 'attachment.image';

export type PrismionContent =
  | { type: 'prompt'; prompt: string }
  | { type: 'result.text'; text: string }
  | { type: 'result.richtext'; html: string }
  | { type: 'result.image'; url: string; alt?: string }
  | { type: 'result.video'; url: string; poster?: string }
  | { type: 'result.link'; url: string; label?: string }
  | { type: 'attachment.file'; url: string; name?: string; sizeBytes?: number }
  | { type: 'attachment.image'; url: string; name?: string; sizeBytes?: number; alt?: string };
