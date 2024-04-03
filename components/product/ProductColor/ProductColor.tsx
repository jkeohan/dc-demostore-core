import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useProduct } from '../WithProduct/WithProduct';
import { nanoid } from 'nanoid';
import first from 'lodash/first';

const ProductColor = () => {
    const { product, setAttribute, attributes, productVariant } = useProduct() || {};
    if (!product) {
        return <></>;
    }

    // make sure color is an attribute
    if (!productVariant.color) {
        return <></>;
    }

    const colors = product && product.variants ? [...new Set(product.variants.map((x: any) => x.color))] : [];

    return (
        <div style={{ marginTop: 10 }}>
            <FormControl variant="standard">
                <InputLabel>Color</InputLabel>
                <Select
                    id="product_color_select"
                    defaultValue={first(colors)}
                    value={attributes?.color}
                    onChange={(event) => setAttribute && setAttribute('color', event.target.value)}
                >
                    {colors.map((color: any) => (
                        <MenuItem key={nanoid()} value={color}>
                            {color}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default ProductColor;
