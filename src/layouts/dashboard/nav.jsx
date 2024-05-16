import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
// import { ExpandMore } from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { replaceSpaces } from 'src/utils/replace-spaces';

import { getModulesWithManuals } from 'src/data/api';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import SearchModal from 'src/components/modal-search/SearchModal';

import { NAV } from './config-layout';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const [modulesWithManuals, setCategories] = useState([]);

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getModulesWithManuals();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {modulesWithManuals.map((item, index) => (
        <NavItem key={index} item={item} />
      ))}
    </Stack>
  );

  // const renderUpgrade = (
  //   <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
  //     <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
  //       <Box
  //         component="img"
  //         src="/assets/illustrations/illustration_avatar.png"
  //         sx={{ width: 100, position: 'absolute', top: -50 }}
  //       />

  //       <Box sx={{ textAlign: 'center' }}>
  //         <Typography variant="h6">Get more?</Typography>

  //         <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
  //           From only $69
  //         </Typography>
  //       </Box>

  //       <Button
  //         href="https://material-ui.com/store/items/minimal-dashboard/"
  //         target="_blank"
  //         variant="contained"
  //         color="inherit"
  //       >
  //         Upgrade to Pro
  //       </Button>
  //     </Stack>
  //   </Box>
  // );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        },
        flexGrow: 1,
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      <SearchModal />

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            bgcolor: 'primary.main',
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
              bgcolor: 'primary.main',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const [openModule, setOpenModule] = useState(false);
  const [openOperations, setOpenOperations] = useState({});

  const handleModuleClick = () => {
    setOpenModule(!openModule);
  };

  const handleOperationClick = (index) => {
    setOpenOperations({ ...openOperations, [index]: !openOperations[index] });
  };

  return (
    <>
      <ListItemButton
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'text.white',
          textTransform: 'capitalize',
          fontWeight: 'bold',
        }}
        onClick={handleModuleClick}
      >
        <ListItemText component="span">
          {item.modulo}
        </ListItemText>

        <Box
          component="span"
          alignItems="end"
          justifyContent="flex-end"
          sx={{ width: 24, height: 24, mr: 2 }}
        >
          {item.operations && <> {openModule ? <ArrowCircleUpIcon /> : <ArrowCircleDownIcon />} </>}
        </Box>
      </ListItemButton>
      {item.operations && (
        <>
          {item.operations.map((operation, index) => (
            <Collapse key={index} in={openModule} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{
                    pl: 4,
                    minHeight: 44,
                    borderRadius: 0.75,
                    typography: 'subtitle',
                    fontWeight: 'light',
                    textTransform: 'capitalize',
                    color: 'text.white',
                    
                  }}
                  onClick={() => handleOperationClick(index)}
                >
                  <ListItemText
                    primary={<Typography variant="subtitle2">{operation.operacion}</Typography>}
                  />
                  <Box
                    component="span"
                    alignItems="end"
                    justifyContent="flex-end"
                    sx={{ width: 24, height: 24, mr: 2 }}
                  >
                    {openOperations[index] ? <ArrowCircleUpIcon /> : <ArrowCircleDownIcon />}
                  </Box>
                </ListItemButton>
                <Collapse in={openOperations[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {operation.posts.map(({ id_manual, manual }) => (
                      <ListItemButton
                        key={id_manual}
                        component={RouterLink}
                        to={`/manual/${replaceSpaces(manual)}`}
                        sx={{
                          pl: 6,
                          minHeight: 44,
                          borderRadius: 0.75,
                          typography: 'subtitle',
                          color: 'text.white',
                          textTransform: 'capitalize',
                          fontWeight: 'fontWeightLight',
                        }}
                      >
                        <ListItemText
                          primary={<Typography variant="subtitle2">{manual}</Typography>}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </List>
            </Collapse>
          ))}
        </>
      )}
    </>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

// ----------------------------------------------------------------------
