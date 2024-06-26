import PropTypes from 'prop-types';
import {
  MenuDivider,
  isTouchDevice,
  MenuButtonBold,
  MenuButtonUndo,
  MenuButtonIndent,
  MenuSelectHeading,
  MenuButtonAddTable,
  MenuButtonEditLink,
  MenuButtonUnindent,
  MenuSelectFontSize,
  MenuButtonTextColor,
  MenuSelectTextAlign,
  MenuButtonBlockquote,
  MenuSelectFontFamily,
  MenuButtonImageUpload,
  MenuButtonOrderedList,
  MenuControlsContainer,
  MenuButtonBulletedList,
  MenuButtonHorizontalRule,
  MenuButtonRemoveFormatting,
} from 'mui-tiptap';

import { useTheme } from '@mui/material';

export default function EditorMenuControls({children}) {
  const theme = useTheme();

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });

  return (
    <MenuControlsContainer>
      <MenuSelectFontFamily
        options={[
          { label: 'Comic Sans', value: 'Comic Sans MS, Comic Sans' },
          { label: 'Cursive', value: 'cursive' },
          { label: 'Monospace', value: 'monospace' },
          { label: 'Serif', value: 'serif' },
        ]}
      />

      <MenuDivider />

      <MenuSelectHeading />

      <MenuDivider />

      <MenuSelectFontSize />

      <MenuDivider />

      <MenuButtonBold />

      {/* <MenuButtonItalic /> */}

      {/* <MenuButtonStrikethrough /> */}

      <MenuDivider />

      <MenuButtonTextColor
        defaultTextColor={theme.palette.text.primary}
        swatchColors={[
          { value: '#000000', label: 'Black' },
          { value: '#ffffff', label: 'White' },
          { value: '#888888', label: 'Grey' },
          { value: '#ff0000', label: 'Red' },
          { value: '#ff9900', label: 'Orange' },
          { value: '#ffff00', label: 'Yellow' },
          { value: '#00d000', label: 'Green' },
          { value: '#0000ff', label: 'Blue' },
        ]}
      />

      <MenuDivider />

      <MenuButtonEditLink />

      <MenuDivider />

      <MenuSelectTextAlign />

      <MenuDivider />

      <MenuButtonOrderedList />

      <MenuButtonBulletedList />

      {/* On touch devices, we'll show indent/unindent buttons, since they're
      unlikely to have a keyboard that will allow for using Tab/Shift+Tab. These
      buttons probably aren't necessary for keyboard users and would add extra
      clutter. */}
      {isTouchDevice() && (
        <>
          <MenuButtonIndent />

          <MenuButtonUnindent />
        </>
      )}

      <MenuDivider />

      <MenuButtonBlockquote />

      <MenuDivider />

      {/* <MenuButtonCode />

      <MenuButtonCodeBlock /> */}

      <MenuDivider />

      <MenuButtonImageUpload
        onUploadFiles={(files) =>
          // For the sake of a demo, we don't have a server to upload the files
          // to, so we'll instead convert each one to a local "temporary" object
          // URL. This will not persist properly in a production setting. You
          // should instead upload the image files to your server, or perhaps
          // convert the images to bas64 if you would like to encode the image
          // data directly into the editor content, though that can make the
          // editor content very large.
          Promise.all(
            files.map(async (file) => ({
              src: `data:${file.type};base64,${await fileToBase64(file)}`,
              alt: file.name,
            }))
          )
        }
      />

      <MenuDivider />

      <MenuButtonHorizontalRule />

      <MenuButtonAddTable />

      <MenuDivider />

      <MenuButtonRemoveFormatting />

      <MenuDivider />

      <MenuButtonUndo />

      {children}

    </MenuControlsContainer>
  );
}

EditorMenuControls.propTypes = {
  children: PropTypes.node,
};
