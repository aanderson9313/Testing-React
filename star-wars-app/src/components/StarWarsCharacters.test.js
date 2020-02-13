import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { getData as mockGetData } from '../api';
import StarWarsCharacters from './StarWarsCharacters';

jest.mock('../api');

test('renders list of Starwars characters and moves through pages', async () => {
    mockGetData.mockResolvedValueOnce({
        id: 1,
        next: 'https://swapi.co/api/people',
        previous: 'https://swapi.co/api/people',
        results: [
            {
                name: 'Luke Skywalker', 
                url: 'test'
            },
            {
                name: 'Han Solo', 
                url: 'Test'
            }
        ]
    })

    const { getByText } = render(<StarWarsCharacters /> );

    
    fireEvent.click(getByText('Next'));
    fireEvent.click(getByText('Previous'));

    expect(mockGetData).toHaveBeenCalledTimes(1);

    wait(() => getByText(/Next/i))
    wait(() => getByText(/Previous/i))

});
