import React, { useEffect, useState } from 'react';
import { Select, Button } from 'antd';

const Filter = ({data, placeholder, onFilterChange, onClean }) => {
    const { Option } = Select;

    return (
        <div>
            <Select
                style={{ width: '400px', paddingLeft: '30px', marginRight: '20px' }}
                showSearch
                defaultValue={null}
                placeholder={placeholder ? placeholder : null}
                onChange={(value) => onFilterChange(value)}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }

            >
                {data && data.map(item => {
                    return (
                        <Option key={item.id} value={item.id}>{item.name.toUpperCase()}</Option>
                    )
                })}
            </Select>
            <Button
                className='button'
                onClick={() => onClean()}
            >
                Limpiar
            </Button>
        </div>
    )
};

export default Filter;

