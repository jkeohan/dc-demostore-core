import React, { useState, useRef, useCallback, forwardRef, useLayoutEffect } from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { SixK } from '@mui/icons-material';

export interface ResponsiveImageProps {
    src: string;
    alt: string;
    sx?: SxProps<Theme>;
    className?: string;
}

function useParentSize() {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 1, height: 1 });

    useLayoutEffect(() => {
        function updateSize() {
            if (ref.current) {
                setSize({
                    width: ref.current.offsetWidth,
                    height: ref.current.offsetHeight,
                });
            }
        }
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return [ref, size] as const;
}

export const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(function ResponsiveImage(
    { src, alt, sx, className },
    ref,
) {
    const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        console.log('aspectRatio', aspectRatio, sx, e.currentTarget.naturalWidth, e.currentTarget.naturalHeight);
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth && naturalHeight) {
            setAspectRatio(naturalWidth / naturalHeight);
        }
    }, []);

    // Allow parent to pass a ref
    React.useImperativeHandle(ref, () => imgRef.current as HTMLImageElement, []);

    return (
        <Box
            sx={{
                position: 'absolute',
                className: 'test',
                width: '100%',
                ...(aspectRatio ? { aspectRatio } : { minHeight: 1 }),
                aspectRatio: '16/9',
                ...sx,
            }}
            className={className}
        >
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                onLoad={handleImageLoad}
                style={{
                    width: '100%',
                    // height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    position: 'absolute',
                    // top: 0,
                    // left: 0,
                }}
            />
        </Box>
    );
});
