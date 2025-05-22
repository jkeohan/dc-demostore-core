import React from 'react';
import { ButtonBack } from 'pure-react-carousel';
import { NavigatePrevious } from '@components/icons';
import NavigateBeforeOutlined from '@mui/icons-material/NavigateBeforeOutlined';

interface SliderButtonProps {
    theme: 'primary' | 'secondary';
}

const SliderBackButton = ({ theme }: SliderButtonProps) => {
    const themeColor = theme === "primary" ? "black" : "white"

    return (
        <ButtonBack style={{ display: 'contents' }}>
            <NavigateBeforeOutlined
                sx={{
                    '& path': {
                        fill: themeColor ,
                    },
                }}
                style={{
                    cursor: 'pointer',
                    color: 'black',
                    width: 35,
                    height: 40,
                    fill: '#fff',
                    // background: 'rgba(0, 0, 0, 0.5)',
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: 0,
                    transform: 'translateY(-50%)',
                }}
            />
        </ButtonBack>
    );
};

export default SliderBackButton;
