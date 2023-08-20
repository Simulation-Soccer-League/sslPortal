import { STARTING_TPE } from '../../lib/constants';

export type ChangeTypes = 'Render' | 'Position' | 'Name' | 'JerseyNumber';

export type ActivityTypes =
  | 'Coaching'
  | 'Training'
  | 'Activity Check'
  | 'Training Camp';

export const PLAYER_TASK_STATUSES = [
  'SMJHL Rookie',
  'SHL/Send-down',
  'Draftee Free Agent',
  'Everyone',
] as const;

export type PlayerTaskStatus = (typeof PLAYER_TASK_STATUSES)[number];

export const PLAYER_TASK_STATUS = {
  ROOKIE: 'SMJHL Rookie',
  SHL: 'SHL/Send-down',
  DFA: 'Draftee Free Agent',
} as const;

export const POSITIONS = [
  'Center',
  'Left Wing',
  'Right Wing',
  'Left Defense',
  'Right Defense',
  'Goalie',
] as const;

export type Position = (typeof POSITIONS)[number];

const HANDEDNESS = ['Left', 'Right'] as const;

export type Handedness = (typeof HANDEDNESS)[number];

export const COUNTRIES = [
  'Canada',
  'Czechia',
  'Finland',
  'France',
  'Germany',
  'Great Britain',
  'Ireland',
  'Japan',
  'Latvia',
  'Norway',
  'Independent Russia',
  'Sweden',
  'Switzerland',
  'USA',
  'Other',
] as const;

export const IIHF_COUNTRIES = {
  0: 'Germany',
  1: 'Great Britain',
  2: 'Ireland',
  4: 'France',
  5: 'Canada',
  6: 'Czechia',
  7: 'Finland',
  8: 'Independent Russia',
  9: 'Sweden',
  10: 'Switzerland',
  11: 'USA',
  12: 'Japan',
  13: 'Latvia',
  14: 'Norway',
} as const;

export type Country = (typeof COUNTRIES)[number];

export const PLAYER_INFO_OPTIONS = {
  POSITIONS,
  HANDEDNESS,
  COUNTRIES,
} as const;

export const PLAYER_DEFAULTS = {
  info: {
    name: '',
    position: 'Center',
    handedness: 'Right',
    recruiter: '',
    render: '',
    jerseyNumber: 0,
    iihfNation: '',
    height: '',
    weight: 200,
    birthplace: '', // List of Countries? / City
    totalTPE: STARTING_TPE,
  },
  goalie: {
    blocker: 5,
    glove: 5,
    passing: 5,
    pokeCheck: 5,
    positioning: 5,
    rebound: 5,
    recovery: 5,
    puckhandling: 5,
    lowShots: 5,
    reflexes: 5,
    skating: 5,
    mentalToughness: 5,
    goaltenderStamina: 5,
  },
  skater: {
    screening: 5,
    gettingOpen: 5,
    passing: 5,
    puckhandling: 5,
    shootingAccuracy: 5,
    shootingRange: 5,
    offensiveRead: 5,
    checking: 5,
    hitting: 5,
    positioning: 5,
    stickchecking: 5,
    shotBlocking: 5,
    faceoffs: 5,
    defensiveRead: 5,
    acceleration: 5,
    agility: 5,
    balance: 5,
    speed: 5,
    strength: 5,
    fighting: 5,
    aggression: 5,
    bravery: 5,
    stamina: 14,
  },
  availableTPE: STARTING_TPE,
} as const;

export type LimitedAttribute = {
  min: number;
  max: number;
  positions: Position[];
};

export type SkaterAttributeCosts = {
  pointCost: number;
  totalCost: number;
  stamCost: number;
};

export type GoalieAttributeCosts = {
  pointCost: number;
  totalCost: number;
};

export const ATTRIBUTE_LABEL_TOOLTIPS = {
  screening:
    "The player's ability to reduce the goalie's chance at making a save by interfering with his ability to see/react to a shot.",
  gettingOpen:
    "The player's ability to find a place to shoot from when his team has the puck but he's not carrying it.",
  passing:
    "The player's ability to make an accurate pass to a player in a good position to safely receive it.|The goalie's ability to make an accurate and intelligent pass to a teammate.",
  puckhandling:
    "The player's ability, while carrying the puck, to avoid turning it over due to an opponent's checking or his own maneuvering.|The goalie's ability to hold onto the puck while carrying it.",
  shootingAccuracy:
    "The player's effectiveness at hitting a target with his shot. Max 13 for Defenders.",
  shootingRange:
    'Shooting range identifies, the maximum range from which the player shoots at 100% of his normal accuracy. Max 12 for Forwards.',
  offensiveRead:
    "The player's ability, while his team has the puck, to determine how to respond to the current on-ice situation.",
  checking:
    "The player's ability to lower the chance of an offensive player's success at what he is attempting to do.",
  hitting:
    "The player's ability to separate the puck carrier from the puck with a bodycheck.",
  positioning:
    "The player's ability to move, when defending, to the proper spot on the ice in the current situation.|The goalie's ability to position himself in the best technical way to make the save.",
  stickchecking:
    "The player's ability to cause the puck carrier to lose possession by using his stick.",
  shotBlocking:
    'The willingness and skill level of the player when trying to block shots. Max 12 for Forwards.',
  faceoffs: "Improves the player's ability to win faceoffs.",
  defensiveRead:
    "The player's ability to understand what the offense is about to try to do.",
  acceleration: 'How quickly the player reaches his maximum speed.',
  agility:
    "The player's ability to move quickly to evade opposing players, or respond to an opponent's evasions",
  balance:
    "The player's ability to remain upright in a controlled manner when in contact with an opposing player.",
  speed:
    'How fast the player moves at his maximum speed, regardless of how long it takes him to reach that speed.',
  stamina:
    'How long the player can stay on the ice, both on a per-shift and per-game basis.',
  strength:
    'The physical strength of the player as applied to hockey situations.',
  fighting:
    'The fighting rating primarily affects the frequency with which a player fights, and, to a lesser extent, his fighting skill.',
  aggression:
    "The player's tendency towards physical aggressiveness.|The goaltender's tendency towards physical aggressiveness.",
  bravery:
    "The player's willingness to put himself into physically risky positions.",
  determination:
    "The player's tendency to be unaffected by bad news both during and after games.|The goaltender's tendency to be unaffected by bad news both during and after games.",
  teamPlayer:
    "The player's ability and willingness to make use of his teammates, primarily offensively but also defensively.|The goaltender's ability and willingness to make use of his teammates.",
  leadership:
    "The player's ability to positively influence the in-game performance and off-ice happiness of his teammates.|The goaltender's ability to positively influence the in-game performance and off-ice happiness of his teammates.",
  temperament:
    "The player's tendency to react aggressively to an opponent's actions.",
  professionalism:
    "The player's tendency to play to the best of his abilities in bad or unpleasant circumstances.|The goaltender's tendency to play to the best of his abilities in bad or unpleasant circumstances.",

  blocker: "The goalie's ability to stop shots aimed high on his stick side.",
  glove: "The goalie's ability to stop shots aimed high on his glove side.",
  pokeCheck:
    "The goalie's ability to knock the puck away from a player close to the net.",
  rebound:
    "The goalie's ability to control the frequency, direction, and distance of rebounds after he makes a save.",
  recovery:
    "The goalie's ability to get into position again after making a save.",
  lowShots:
    "The goalie's ability to stop shots aimed below the reach of his glove/blocker, on either side or through the 5-hole.",
  reflexes:
    'The physical ability of the goalie to respond quickly to a shot, both in terms of reflexes and agility.',
  skating: "The goalie's skating ability.",
  mentalToughness:
    "The goaltender's ability to recover after letting in a goal.",
  goaltenderStamina:
    "The goaltender's ability to recover from fatigue between games.",
} as const;

// Forward Roles
const PerimiterShooter = 'Perimiter Shooter';
const Sniper = 'Sniper';
const GarbageCollector = 'Garbage Collector';
const Dangler = 'Dangler';
const SpeedyForward = 'Speedy Forward';
const Playmaker = 'Playmaker';
const SetupMan = 'Setup Man';
const GretzkysOffice = "Gretzky's Office";
const Screener = 'Screener';
const PowerForward = 'Power Forward';
const CounterattackingForward = 'Counterattacking Forward';
const TwoWayForward = 'Two-Way Forward';
const UpAndDownWinger = 'Up and Down Winger';
const Grinder = 'Grinder';
const AggressiveForechecker = 'Aggressive Forechecker';
const PunishingForward = 'Punishing Forward';
const BackcheckingForward = 'Backchecking Forward';
const Shadow = 'Shadow';
const Agitator = 'Agitator';
const Goon = 'Goon';

export const FORWARD_ROLES = [
  PerimiterShooter,
  Sniper,
  GarbageCollector,
  Dangler,
  SpeedyForward,
  Playmaker,
  SetupMan,
  GretzkysOffice,
  Screener,
  PowerForward,
  CounterattackingForward,
  TwoWayForward,
  UpAndDownWinger,
  Grinder,
  AggressiveForechecker,
  PunishingForward,
  BackcheckingForward,
  Shadow,
  Agitator,
  Goon,
] as const;

// Defenseman Roles

const PlaymakingDefenseman = 'Playmaking Defenseman';
const RushingDefenseman = 'Rushing Defenseman';
const Quarterback = 'Quarterback';
const PointShooter = 'Point Shooter';
const TwoWayDefenseman = 'Two-Way Defenseman';
const MobileDefenseman = 'Mobile Defenseman';
const StayAtHomeDefenseman = 'Stay-at-Home Defenseman';
const CreaseClearingDefenseman = 'Crease-Clearing Defenseman';
const PunishingDefenseman = 'Punishing Defenseman';
const ShutdownDefenseman = 'Shutdown Defenseman';
const OldSchoolDefenseman = 'Old-School Defenseman';
const AgitatorDefenseman = 'Agitator Defenseman';
const GoonDefenseman = 'Goon Defenseman';

export const DEFENSEMAN_ROLES = [
  PlaymakingDefenseman,
  RushingDefenseman,
  Quarterback,
  PointShooter,
  TwoWayDefenseman,
  MobileDefenseman,
  StayAtHomeDefenseman,
  CreaseClearingDefenseman,
  PunishingDefenseman,
  ShutdownDefenseman,
  OldSchoolDefenseman,
  AgitatorDefenseman,
  GoonDefenseman,
] as const;

export type PlayerRole =
  | (typeof DEFENSEMAN_ROLES)[number]
  | (typeof FORWARD_ROLES)[number];

export const ROLE_ATTRIBUTES = {
  screening: [
    Sniper,
    GarbageCollector,
    Screener,
    PowerForward,
    Grinder,
    PunishingForward,
    Agitator,
    AgitatorDefenseman,
    GoonDefenseman,
  ],
  gettingOpen: [
    PerimiterShooter,
    Sniper,
    GarbageCollector,
    Dangler,
    SpeedyForward,
    GretzkysOffice,
    Screener,
    PowerForward,
    PlaymakingDefenseman,
    PointShooter,
  ],
  passing: [
    Playmaker,
    SetupMan,
    GretzkysOffice,
    CounterattackingForward,
    TwoWayForward,
    PlaymakingDefenseman,
    Quarterback,
    TwoWayDefenseman,
    OldSchoolDefenseman,
  ],
  puckhandling: [
    PerimiterShooter,
    Sniper,
    Dangler,
    SpeedyForward,
    Playmaker,
    SetupMan,
    GretzkysOffice,
    Screener,
    PowerForward,
    TwoWayForward,
    UpAndDownWinger,
    BackcheckingForward,
    Shadow,
    PlaymakingDefenseman,
    RushingDefenseman,
    Quarterback,
    PointShooter,
    TwoWayDefenseman,
    MobileDefenseman,
    StayAtHomeDefenseman,
    CreaseClearingDefenseman,
    PunishingDefenseman,
    ShutdownDefenseman,
  ],
  shootingAccuracy: [
    PerimiterShooter,
    Sniper,
    GarbageCollector,
    Dangler,
    Screener,
    UpAndDownWinger,
    PlaymakingDefenseman,
    RushingDefenseman,
    Quarterback,
    PointShooter,
  ],
  shootingRange: [RushingDefenseman, PointShooter],
  offensiveRead: [
    PerimiterShooter,
    Sniper,
    GarbageCollector,
    Dangler,
    SpeedyForward,
    Playmaker,
    SetupMan,
    GretzkysOffice,
    CounterattackingForward,
    TwoWayForward,
    PlaymakingDefenseman,
    RushingDefenseman,
    Quarterback,
    PointShooter,
    TwoWayDefenseman,
  ],
  checking: [
    PowerForward,
    TwoWayForward,
    UpAndDownWinger,
    Grinder,
    AggressiveForechecker,
    PunishingForward,
    BackcheckingForward,
    Shadow,
    Agitator,
    StayAtHomeDefenseman,
    CreaseClearingDefenseman,
    PunishingDefenseman,
    ShutdownDefenseman,
    OldSchoolDefenseman,
    AgitatorDefenseman,
  ],
  hitting: [
    PowerForward,
    Grinder,
    AggressiveForechecker,
    PunishingForward,
    Agitator,
    CreaseClearingDefenseman,
    PunishingDefenseman,
    ShutdownDefenseman,
    AgitatorDefenseman,
  ],
  positioning: [
    TwoWayForward,
    UpAndDownWinger,
    BackcheckingForward,
    Shadow,
    TwoWayDefenseman,
    MobileDefenseman,
    StayAtHomeDefenseman,
    CreaseClearingDefenseman,
    OldSchoolDefenseman,
  ],
  stickchecking: [
    SetupMan,
    CounterattackingForward,
    TwoWayForward,
    UpAndDownWinger,
    Grinder,
    AggressiveForechecker,
    PunishingForward,
    BackcheckingForward,
    Shadow,
    Agitator,
    TwoWayDefenseman,
    MobileDefenseman,
    StayAtHomeDefenseman,
    AgitatorDefenseman,
  ],
  shotBlocking: [
    StayAtHomeDefenseman,
    PunishingDefenseman,
    OldSchoolDefenseman,
  ],
  faceoffs: [Playmaker, GretzkysOffice, Screener],
  defensiveRead: [
    CounterattackingForward,
    TwoWayForward,
    AggressiveForechecker,
    BackcheckingForward,
    Shadow,
    TwoWayDefenseman,
    ShutdownDefenseman,
    OldSchoolDefenseman,
  ],
  acceleration: [
    PerimiterShooter,
    Sniper,
    Dangler,
    SpeedyForward,
    Playmaker,
    SetupMan,
    CounterattackingForward,
    AggressiveForechecker,
    BackcheckingForward,
    PlaymakingDefenseman,
    RushingDefenseman,
    Quarterback,
    PointShooter,
    MobileDefenseman,
    ShutdownDefenseman,
  ],
  agility: [
    PerimiterShooter,
    GarbageCollector,
    Dangler,
    SpeedyForward,
    Playmaker,
    SetupMan,
    GretzkysOffice,
    CounterattackingForward,
    UpAndDownWinger,
    PlaymakingDefenseman,
    RushingDefenseman,
    Quarterback,
    PointShooter,
    MobileDefenseman,
  ],
  balance: [
    PerimiterShooter,
    GarbageCollector,
    Dangler,
    SpeedyForward,
    Screener,
    PowerForward,
    TwoWayForward,
    UpAndDownWinger,
    Grinder,
    AggressiveForechecker,
    PunishingForward,
    BackcheckingForward,
    Shadow,
    Agitator,
    TwoWayDefenseman,
    MobileDefenseman,
    StayAtHomeDefenseman,
    CreaseClearingDefenseman,
    PunishingDefenseman,
    ShutdownDefenseman,
    OldSchoolDefenseman,
    Agitator,
  ],
  speed: [
    PerimiterShooter,
    Sniper,
    Dangler,
    SpeedyForward,
    PowerForward,
    CounterattackingForward,
    UpAndDownWinger,
    AggressiveForechecker,
    BackcheckingForward,
    Shadow,
    RushingDefenseman,
    Quarterback,
    TwoWayDefenseman,
    MobileDefenseman,
  ],
  strength: [
    GarbageCollector,
    Screener,
    PowerForward,
    Grinder,
    PunishingForward,
    Goon,
    StayAtHomeDefenseman,
    CreaseClearingDefenseman,
    PunishingDefenseman,
    GoonDefenseman,
  ],
  fighting: [
    Agitator,
    Goon,
    PunishingDefenseman,
    AgitatorDefenseman,
    GoonDefenseman,
  ],
  aggression: [Agitator, Goon, AgitatorDefenseman, GoonDefenseman],
  bravery: [Grinder, Goon, GoonDefenseman],
  stamina: [
    GretzkysOffice,
    PointShooter,
    ShutdownDefenseman,
    OldSchoolDefenseman,
  ],
};
