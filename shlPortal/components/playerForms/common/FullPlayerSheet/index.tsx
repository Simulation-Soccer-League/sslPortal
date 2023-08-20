import { Search2Icon } from '@chakra-ui/icons';
import { Badge, Link, Tooltip } from '@chakra-ui/react';
import { Base64 } from 'js-base64';
import { HTMLAttributes, PropsWithChildren, ReactNode, useMemo } from 'react';

import { useGetCappedTPE } from '../../../../hooks/useGetCappedTPE';
import { useSeason } from '../../../../hooks/useSeason';
import { useTeamInfo } from '../../../../hooks/useTeamInfo';
import { Player } from '../../../../typings';
import { formatCurrency } from '../../../../utils/formatCurrency';
import { formatDateTime } from '../../../../utils/formatDateTime';
import { TeamLogo } from '../../../TeamLogo';
import { ChangeIcon } from '../../changeForms/ChangeIcon';

import { GoalieAttributeTable } from './GoalieAttributeTable';
import { SkaterAttributeTable } from './SkaterAttributeTable';
import { TPEEventsAccordion } from './TPEEventsAccordion';
import { UpdateEventsAccordion } from './UpdateEventsAccordion';

const Value = ({ label, children }: PropsWithChildren<{ label: string }>) => (
  <div className="flex flex-nowrap items-center whitespace-nowrap ">
    <span className="mr-2 font-bold">{label}: </span>
    <p className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap lg:max-w-[400px]">
      {children}
    </p>
  </div>
);

const Section = ({
  label,
  cols = 2,
  borderStyle,
  children,
}: PropsWithChildren<{
  label: string;
  cols?: 2 | 3;
  borderStyle: HTMLAttributes<HTMLDivElement>['style'];
}>) => (
  <div>
    <div className="bg-grey900 p-2 text-grey100" style={borderStyle}>
      <div className="flex justify-between font-bold">
        <span>{label}</span>
      </div>
    </div>
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-6 p-2">
      <div
        className={`grid w-full grid-cols-1 gap-6 text-sm ${
          cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
        }`}
      >
        {children}
      </div>
    </div>
  </div>
);

export const FullPlayerSheet = ({
  player,
  attributeMenu,
  activityMenu,
  readOnly,
}: {
  player: Player;
  attributeMenu?: ReactNode;
  activityMenu?: ReactNode;
  readOnly?: boolean;
}) => {
  const { currentTeam, currentLeague, shlRightsTeam } = useTeamInfo(
    player.currentLeague,
    player.currentTeamID,
    player.shlRightsTeamID,
  );

  const { season } = useSeason();
  const { totalTPE, isCappedTPE } = useGetCappedTPE(player, season);

  const bottomBorderStyle: {
    primary: HTMLAttributes<HTMLDivElement>['style'];
    secondary: HTMLAttributes<HTMLDivElement>['style'];
  } = useMemo(() => {
    if (!currentTeam?.colors.primary) {
      return { primary: {}, secondary: {} };
    }

    return {
      primary: {
        borderBottomWidth: '8px',
        borderBottomColor: currentTeam?.colors.primary,
      },
      secondary: {
        borderBottomWidth: '4px',
        borderBottomColor: currentTeam?.colors.secondary,
      },
    };
  }, [currentTeam?.colors]);

  return (
    <div className="space-y-4">
      <div>
        <div
          className="bg-grey900 p-2 text-grey100"
          style={bottomBorderStyle.primary}
        >
          <div className="flex justify-between font-bold lg:text-xl">
            <div className="flex flex-col place-content-end">
              <div className="flex max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap lg:max-w-[400px]">
                {player.name}
                {!readOnly && <ChangeIcon type="Name" />}
              </div>
              <div className="flex">
                {player.position}
                {!readOnly && <ChangeIcon type="Position" />}
                &nbsp;&nbsp;|&nbsp;&nbsp;#
                <span className="font-mont">{player.jerseyNumber}</span>
                {!readOnly && <ChangeIcon type="JerseyNumber" />}
              </div>
              <div>
                <span className="font-mont">{player.height}</span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span className="font-mont">{player.weight}</span> lbs
              </div>
            </div>
            {currentLeague && currentTeam?.abbreviation && (
              <TeamLogo
                teamAbbreviation={currentTeam?.abbreviation}
                league={currentLeague}
                className="mt-2 max-h-20 lg:max-h-28"
              />
            )}
          </div>
        </div>
        {activityMenu}
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-6 p-2">
          <div className="grid w-full grid-cols-1 gap-6 text-sm md:grid-cols-2">
            <Value label="Render">
              {player.render}
              {!readOnly && <ChangeIcon type="Render" />}
            </Value>
            {player.birthplace && (
              <Value label="Birthplace">{player.birthplace}</Value>
            )}
            <Value label="Shoots">{player.handedness}</Value>
            <Value label="Bank Balance">
              <Link
                title="View Bank Account"
                aria-label="View Bank Account"
                className="!hover:no-underline flex items-center font-mont hover:text-blue600"
                href={`/bank/account/${player.uid}`}
              >
                {formatCurrency(player.bankBalance ?? 0)}
                <Search2Icon className="ml-2 justify-self-center align-middle" />
              </Link>
            </Value>
            {readOnly && (
              <Value label="Username">
                <Link
                  title="View Forum Profile"
                  aria-label="View Forum Profile"
                  className="!hover:no-underline flex items-center font-mont hover:text-blue600"
                  href={`https://simulationhockey.com/member.php?action=profile&uid=${player.uid}`}
                >
                  {player.username}
                  <Search2Icon className="ml-2 justify-self-center align-middle" />
                </Link>
              </Value>
            )}
          </div>
        </div>
      </div>

      <Section label="League" borderStyle={bottomBorderStyle.secondary}>
        <Value label="Current League">{player.currentLeague}</Value>
        <Value label="Current Team">{currentTeam?.name}</Value>
        {player.currentLeague !== 'SHL' && shlRightsTeam && (
          <Value label="SHL Rights Team">{shlRightsTeam.name}</Value>
        )}
        <Value label="IIHF Nation">{player.iihfNation}</Value>
      </Section>

      <Section label="Historical" borderStyle={bottomBorderStyle.secondary}>
        <Value label="Creation Date">
          <span className="font-mont">
            {formatDateTime(player.creationDate, true)}
          </span>
        </Value>
        <Value label="Draft Season">
          <span className="font-mont">{player.draftSeason}</span>
        </Value>
        {player.retirementDate && (
          <Value label="Retirement Date">
            <span className="font-mont">
              {formatDateTime(player.retirementDate)}
            </span>
          </Value>
        )}
      </Section>

      <Section label="TPE" cols={3} borderStyle={bottomBorderStyle.secondary}>
        <Value label="Total TPE">
          <span className="font-mont">{player.totalTPE}</span>
        </Value>
        <Value label="Banked TPE">
          <span className="font-mont">{player.bankedTPE}</span>
        </Value>
        <Value label="Applied TPE">
          <div className="flex flex-nowrap">
            <Link
              title="View Player Build"
              aria-label="View Player Build"
              className="!hover:no-underline flex items-center font-mont hover:text-blue600"
              href={`/player/build?token=${Base64.encode(
                JSON.stringify(
                  player
                    ? {
                        position: player.position,
                        totalTPE: player.totalTPE,
                        currentLeague: 'SHL',
                        draftSeason: 1,
                        bankedTPE: player.bankedTPE,
                        appliedTPE: player.appliedTPE,
                        attributes: player.attributes,
                      }
                    : {},
                ),
              )}`}
            >
              {player.appliedTPE}
              <Search2Icon className="ml-2" />
            </Link>
            {isCappedTPE && (
              <Tooltip
                hasArrow
                label={`Your TPE is capped at ${totalTPE}`}
                bg="gray.300"
                color="black"
              >
                <Badge className="ml-2" colorScheme="red">
                  CAPPED
                </Badge>
              </Tooltip>
            )}
            {player.appliedTPE > player.totalTPE && (
              <Tooltip
                hasArrow
                label={`Your applied TPE is more than your total TPE.`}
                bg="gray.300"
                color="black"
              >
                <Badge className="ml-2" colorScheme="red">
                  REGRESSION DUE
                </Badge>
              </Tooltip>
            )}
          </div>
        </Value>
      </Section>

      <div>
        <div
          className="bg-grey900 p-2 text-grey100"
          style={bottomBorderStyle.secondary}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold">Attributes</span>
            <div className="text-grey900">{attributeMenu}</div>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-6 p-2">
          {player.position === 'Goalie' ? (
            <GoalieAttributeTable player={player} />
          ) : (
            <SkaterAttributeTable player={player} />
          )}
        </div>
      </div>
      <UpdateEventsAccordion
        pid={player.pid}
        borderStyle={bottomBorderStyle.secondary}
      />
      <TPEEventsAccordion
        pid={player.pid}
        borderStyle={bottomBorderStyle.secondary}
      />
    </div>
  );
};
