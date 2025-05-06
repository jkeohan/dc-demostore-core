import React from 'react';
import { ButtonNext } from 'pure-react-carousel';
import { NavigateNext } from '@components/icons';
import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';

interface SliderButtonProps {
    theme?: 'primary' | 'secondary';
} 
const SliderNextButton = ({ theme = 'primary' }: SliderButtonProps) => {
     const themeColor = theme === 'primary' ? 'black' : 'white';
    return (
        <ButtonNext style={{ display: 'contents' }}>
            <NavigateNextOutlined
                sx={{
                    '& path': {
                        fill: themeColor,
                    },
                }}
                style={{
                    cursor: 'pointer',
                    width: 35,
                    height: 40,
                    fill: '#fff',
                    // background: 'rgba(0, 0, 0, 0.5)',
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%)',
                }}
            />
        </ButtonNext>
    );
};

export default SliderNextButton;
