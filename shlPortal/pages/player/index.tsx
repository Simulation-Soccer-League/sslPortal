import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  IconButton,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';

import { CopyButton } from '../../components/common/CopyButton';
import { PageWrapper } from '../../components/common/PageWrapper';
import { UserAlerts } from '../../components/common/UserAlerts';
import { ActivityButtons } from '../../components/playerForms/activityForms/ActivityButtons';
import { AttributeFormTypes } from '../../components/playerForms/attributeForms/attributeFormFlags';
import { FullPlayerSheet } from '../../components/playerForms/common/FullPlayerSheet';
import {
  AttributeChange,
  EditAttributesForm,
} from '../../components/playerForms/editAttributes/EditAttributesForm';
import { useSession } from '../../contexts/AuthContext';
import { ToastContext } from '../../contexts/ToastContext';
import { useCurrentPlayer } from '../../hooks/useCurrentPlayer';
import { useGetCappedTPE } from '../../hooks/useGetCappedTPE';
import { useRetirementMutation } from '../../hooks/useRetirementMutation';
import { useSeason } from '../../hooks/useSeason';
import { useUpdateEvents } from '../../hooks/useUpdateEvents';
import { MAX_REDISTRIBUTION_TPE } from '../../lib/constants';
import DiscordLogo from '../../public/discord.svg';
import { GoalieAttributes, Player, SkaterAttributes } from '../../typings';
import { mutate } from '../../utils/query';

export default () => {
  const router = useRouter();
  const { loggedIn, session } = useSession();
  const queryClient = useQueryClient();
  const { player, loading, status } = useCurrentPlayer();
  const { updateFlags } = useUpdateEvents(player?.pid);
  const { season } = useSeason();
  const [isEditingAttributes, setIsEditingAttributes] =
    useState<boolean>(false);
  const [attributeFormType, setAttributeFormType] =
    useState<Exclude<AttributeFormTypes, 'Create'>>('Update');
  const { addToast } = useContext(ToastContext);
  const [isRetirementModalOpen, setIsRetirementModalOpen] = useState(false);
  const [retirementConfirmationText, setRetirementConfirmationText] =
    useState('');

  const setEditingForm = useCallback(
    (type: Exclude<AttributeFormTypes, 'Create'>) => {
      setAttributeFormType(type);
      setIsEditingAttributes(true);
    },
    [],
  );

  useEffect(() => {
    if (!loggedIn) {
      router.replace('/');
    }

    if (loggedIn && !loading) {
      if (status === 'retired' || status === 'denied') {
        router.replace('/create');
      }
    }
  }, [loading, loggedIn, router, status]);

  const updatePlayer = useMutation<
    // TODO: type return type
    unknown,
    unknown,
    // TODO: type variables a bit stricter
    Record<string, unknown>
  >({
    mutationFn: (variables) =>
      mutate('api/v1/player/update', variables, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      }),
  });

  const submitEdit = useCallback(
    async (
      changes: AttributeChange[],
      info: Partial<Player>,
      goalie?: Partial<GoalieAttributes>,
      skater?: Partial<SkaterAttributes>,
    ) =>
      updatePlayer.mutate(
        {
          type: attributeFormType,
          changes,
          info,
          goalie,
          skater,
        },
        {
          onError: (e) => {
            addToast({
              title: `Changes not saved`,
              description: `We were unable to perform your ${
                attributeFormType === 'Redistribute'
                  ? 'redistribution'
                  : attributeFormType.toLowerCase()
              }. Please try again.`,
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'bottom-right',
            });
            throw new Error(`error: ${e}`);
          },
          onSettled: () => {
            setIsEditingAttributes(false);
            addToast({
              title: `Player successfully updated`,
              description: `Your attribute changes for your ${
                attributeFormType === 'Redistribute'
                  ? 'redistribution'
                  : attributeFormType.toLowerCase()
              } have been applied.`,
              status: 'success',
              duration: 9000,
              isClosable: true,
              position: 'bottom-right',
            });
            queryClient.invalidateQueries({ queryKey: ['myPlayerInfo'] });
          },
        },
      ),
    [attributeFormType, queryClient, addToast, updatePlayer],
  );

  const { submitRetire, isSubmitting } = useRetirementMutation(
    player?.pid,
    'retire',
  );

  const { totalTPE, isCappedTPE } = useGetCappedTPE(player, season);

  return (
    <PageWrapper loading={loading}>
      {player && (status === 'active' || status === 'pending') && (
        <div className="flex items-center justify-center">
          <div className="my-4 flex w-11/12 flex-col lg:w-3/5">
            {status === 'pending' ? (
              <>
                <Alert
                  className="mb-4"
                  status="info"
                  variant="top-accent"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                >
                  <AlertIcon />

                  <AlertTitle>Your player is awaiting approval</AlertTitle>
                  <AlertDescription fontSize="md" className="flex">
                    <div>
                      {player.name} is awaiting approval by the Head Office.
                    </div>
                    <div className="mt-4 flex justify-center">
                      <Link
                        className="text-lg font-bold"
                        href={process.env.primaryDiscordUrl}
                        target="_blank"
                      >
                        To follow-up on your submission, join our Discord.
                        <div className="mt-2 flex justify-center">
                          <DiscordLogo className="max-h-10" />
                        </div>
                      </Link>
                    </div>
                  </AlertDescription>
                </Alert>
                <FullPlayerSheet player={player} readOnly={true} />
              </>
            ) : (
              <>
                {isEditingAttributes ? (
                  <EditAttributesForm
                    player={player}
                    attributeFormType={attributeFormType}
                    season={season}
                    onSubmitCallback={submitEdit}
                    onCancel={() => setIsEditingAttributes(false)}
                  />
                ) : (
                  <>
                    <UserAlerts />
                    <FullPlayerSheet
                      player={player}
                      activityMenu={<ActivityButtons />}
                      attributeMenu={
                        <Menu size="sm">
                          <MenuButton
                            as={IconButton}
                            aria-label="Attribute Updates, Regressions or Redistributions"
                            icon={<HamburgerIcon />}
                          />
                          <MenuList>
                            <MenuItem
                              isDisabled={player.bankedTPE <= 0 || isCappedTPE}
                              onClick={() => setEditingForm('Update')}
                            >
                              Update
                            </MenuItem>
                            <MenuItem
                              isDisabled={player.appliedTPE <= totalTPE}
                              onClick={() => setEditingForm('Regression')}
                            >
                              Regress
                            </MenuItem>
                            <MenuItem
                              isDisabled={
                                player.usedRedistribution >=
                                  MAX_REDISTRIBUTION_TPE || player.bankedTPE < 0
                              }
                              onClick={() => setEditingForm('Redistribute')}
                            >
                              Redistribute
                            </MenuItem>
                            <MenuItem
                              onClick={() => setIsRetirementModalOpen(true)}
                            >
                              Retire
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      }
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <Modal
        size="lg"
        isOpen={isRetirementModalOpen}
        onClose={() => setIsRetirementModalOpen(false)}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Retire Player</ModalHeader>
          <ModalCloseButton isDisabled={isSubmitting} />
          <ModalBody>
            <Alert variant="subtle" status="error" className="mb-4">
              <AlertIcon />
              <AlertDescription fontSize="sm">
                Are you sure you want to retire?
                {updateFlags.unRetirementProcessed
                  ? ` Since you have already unretired this player, this action will be immediate and irreversible.`
                  : ` You will have 7 days to change
                your mind if you haven't yet created a new player. If you
                unretire there will be a 15% TPE penalty applied to your player.`}
                <br />
                Enter your player name below to proceed.
                <CopyButton
                  className="ml-2"
                  aria-label="Copy player name to clipboard"
                  colorScheme="blackAlpha"
                  size="sm"
                  variant="unstyled"
                  value={player?.name ?? ''}
                />
              </AlertDescription>
            </Alert>
            <Input
              onChange={(e) =>
                setRetirementConfirmationText(e.currentTarget.value)
              }
            ></Input>
          </ModalBody>
          <ModalFooter className="bottom-0 flex items-center p-2">
            <Button
              colorScheme="gray"
              type="button"
              className="mr-2 w-1/2"
              isDisabled={isSubmitting}
              onClick={() => setIsRetirementModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="button"
              className="w-1/2"
              isDisabled={
                retirementConfirmationText !== player?.name || isSubmitting
              }
              isLoading={isSubmitting}
              onClick={submitRetire}
            >
              Retire Player
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageWrapper>
  );
};
