const path = require('path');
const fs = require('fs');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) {
            return console.log(err.message);
        }

        const contacts = JSON.parse(data);
        console.table(contacts);
    });
}

function getContactById(contactId) {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) {
            return console.log(err.message);
        }

        const contacts = JSON.parse(data);

        const contact = contacts.find(contact => {
            if (String(contactId) === contact.id) {
                console.table(contact);
                return contact;
            }
        });
    });
}

function removeContact(contactId) {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) {
            return console.log(err.message);
        }

        const contacts = JSON.parse(data);
        const newContacts = contacts.filter(
            contact => contact.id !== String(contactId)
        );
        console.table(newContacts);

        fs.writeFile(contactsPath, JSON.stringify(newContacts), err => {
            if (err) {
                return console.log(err.message);
            }
        });
    });
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) {
            return console.log(err.message);
        }

        const contacts = JSON.parse(data);

        contacts.push({
            id: String(contacts.length + 1),
            name,
            email,
            phone,
        });
        console.table(contacts);

        fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
            if (err) {
                return console.log(err.message);
            }
        });
    });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
