import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Divider, IconButton, ListItemIcon, } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import { router, usePage } from '@inertiajs/react'

export default function DropdownUser() {
    const [open, setOpen] = React.useState(false);
    const { auth } = usePage<any>().props


    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);


    return (
        <Stack direction="row" spacing={2}>
            <div>
                <IconButton className='w-12 h-12 !p-0'
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <img className="rounded-full cursor-pointer w-full" alt={auth?.user?.name} src={auth?.user?.avatar || "/images/no-user.jpg"}
                    />
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                        sx={{
                                            minWidth: '200px',
                                            paddingTop: 0,
                                        }}
                                    >
                                        <div className='p-5 flex flex-col gap-1'>
                                            <p className="text-lg font-semibold">{auth?.user?.name}
                                            </p>
                                            <p className="text-sm text-gray-500">{auth?.user?.email}
                                            </p>
                                        </div>

                                        <Divider sx={{ mb: 1 }} />
                                        <MenuItem onClick={(e: any) => {
                                            e.preventDefault();

                                            handleClose(e);
                                            router.visit('/profile');
                                        }}>
                                            <ListItemIcon>
                                                <Icon icon="tabler:user" />
                                            </ListItemIcon>
                                            My Profile
                                        </MenuItem>
                                        <MenuItem onClick={(e: any) => {
                                            e.preventDefault();

                                            handleClose(e);
                                            router.visit('/garage');
                                        }}>
                                            <ListItemIcon>
                                                <Icon icon="cil:garage" />
                                            </ListItemIcon>
                                            Garage
                                        </MenuItem>
                                        <MenuItem onClick={(e: any) => {
                                            e.preventDefault();

                                            handleClose(e);
                                            router.post('/logout');
                                        }}
                                        >
                                            <ListItemIcon>
                                                <Icon icon="tabler:logout" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
}
