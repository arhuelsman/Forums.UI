import { User } from "../../models/user-model"

export type GetRandomUserResponse = {
    results: RandomUser[]
}

export type RandomUser = {
    name: RandomName,
    location: RandomLocation,
    email: string,
    login: RandomLogin,
    dob: RandomDateOfBirth,
    phone: string,
    cell: string,
}

export type RandomName = {
    title: string,
    first: string
    last: string,
}

export type RandomLocation = {
    street: RandomStreet,
    city: string,
    state: string,
    country: string
    postcode: number,
}

export type RandomStreet = {
    number: number,
    name: string,
}

export type RandomLogin = {
    username: string,
    password: string,
}

export type RandomDateOfBirth = {
    date: string,
}

export function ToUser(randomUser: RandomUser) : User {
    console.log(randomUser.login.password);
    return {
        id: undefined,
        createdDate: undefined,
        username: randomUser.login.username,
        birthDate: new Date(Date.parse(randomUser.dob.date)),
        contacts: [
            {
                contactType: 'Email',
                value: randomUser.email,
            },
            {
                contactType: 'HomePhone',
                value: randomUser.phone,
            },
            {
                contactType: 'CellPhone',
                value: randomUser.cell,
            },
        ],
        location: {
            street: `${randomUser.location.street.number} ${randomUser.location.street.name}`,
            city: randomUser.location.city,
            state: randomUser.location.state,
            country: randomUser.location.country,
            postalCode: `${randomUser.location.postcode}`,
        },
        name: {
            title: randomUser.name.title,
            firstName: randomUser.name.first,
            lastName: randomUser.name.last,
        },
        password: randomUser.login.password,
    }
}