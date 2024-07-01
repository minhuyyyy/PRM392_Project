import { View, Text, Image } from 'react-native';
import React from 'react';
import { StyledComponent } from 'nativewind';

export default function StyledImage({
    alt,
    src,
    width,
    height,
    classname,
    resizeMode,
}: {
    alt: string;
    src: string;
    width?: number;
    height?: number;
    classname?: string;
    resizeMode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
}) {
    return (
        <StyledComponent
            className={classname}
            component={Image}
            source={{ uri: src }}
            width={width}
            height={height}
            alt={alt}
            resizeMode={resizeMode}
        />
    );
}
