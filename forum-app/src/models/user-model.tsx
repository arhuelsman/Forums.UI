export type User = {
    id: bigint | undefined,
    username: string,
    createdDate: Date | undefined,
    birthDate: Date | null,
    contacts: Contact[],
    location: UserLocation,
    name: Name,
    password: string,
}

export type Contact = {
    contactType: 'Default' | 'HomePhone' | 'CellPhone' | 'Email',
    value: string,
}

export type UserLocation = {
    street: string,
    city: string,
    state: string,
    country: string,
    postalCode: string,
}

export type Name = {
    title: string,
    firstName: string,
    lastName: string,
}