import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/globalRedux/store';
import { addItem, removeItems, removeItem, readItems } from '@/app/globalRedux/features/itemSlice';
import Button from './ui/Button';
import Input from './ui/Input';

const ItemsPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [_item, setItem] = useState<string>('');

    const { items, error, loading } = useSelector((state: RootState) => state.itemState);

    useEffect(() => {
        dispatch(readItems())
    }, [dispatch])

    useEffect(() => {
        if (error) {
            console.log("error", error)
        }
    }, [error]);

    const handleAddItem = async (_item: string) => {
        await dispatch(addItem({ item: _item }))
    }

    const removeAll = async () => {
        await dispatch(removeItems())
    }

    const deleteItem = async (_item: string) => {
        await dispatch(removeItem({ item: _item }))
    }

    return (
        <>
            <title>Number Page</title>
            <div className='flex flex-col gap-5 w-[90%] mx-auto'>
                <Input
                    type='text'
                    placeholder='Enter Item'
                    value={_item}
                    onChange={(e) => setItem(e.target.value)}
                    name='item'
                />
                <Button
                    text='Add Item'
                    buttonSize='xs'
                    onClick={() => handleAddItem(_item)}
                />
                <Button
                    text='Remove All'
                    buttonSize='xs'
                    onClick={removeAll}
                />
                <Button
                    text='Delete Item'
                    buttonSize='xs'
                    onClick={() => deleteItem(_item)}
                />
                {items.length > 0 && (
                    <ul>
                        {items.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default ItemsPage