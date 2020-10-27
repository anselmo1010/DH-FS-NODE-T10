const fs = require("fs");
const path = require("path");

const { cards } = require("../data/cards");
const contactsList = require("../data/contacts");

module.exports = {
  list(req, res, next) {
    let contacts = JSON.parse(contactsList)
    res.render('contacts', { contacts });
  },

  create(req, res, next) {
    let contacts = JSON.parse(contactsList)
    let id = contacts.length + 1
    let contact = { id, ...req.body }
    contacts.push(contact)

    let contactsJson = JSON.stringify(contacts)
    let filePath = path.join("data", "contacts.js");

    fs.writeFileSync(filePath, 'module.exports = `');
    fs.appendFileSync(filePath, contactsJson);
    fs.appendFileSync(filePath, '`');
    
    res.render('index', { cards, added: true });
  }, 

  edit(req, res, next) {
    let id = req.params.id;
    let contacts = JSON.parse(contactsList)
    let contact = contacts.find(contato => id == contato.id);

    res.render('edit-contact', { contact });
  },

  update(req, res, next) {
    let id = req.params.id;
    let { nome, email, mensagem } = req.body;
    let contacts = JSON.parse(contactsList)
    let contact = contacts.find(contact => contact.id == id);

    contact.name = nome
    contact.email = email
    contact.message = mensagem

    let contactsJson = JSON.stringify(contacts)
    let filePath = path.join("data", "contacts.js");

    fs.writeFileSync(filePath, 'module.exports = `');
    fs.appendFileSync(filePath, contactsJson);
    fs.appendFileSync(filePath, '`');

    res.render('edit-contact', { contact, updated: true })
  },

  delete(req, res, next) {
    let id = req.params.id;
    let contacts = JSON.parse(contactsList);
    contacts.splice(id - 1, 1);

    let contactsJson = JSON.stringify(contacts)
    let filePath = path.join("data", "contacts.js");

    fs.writeFileSync(filePath, 'module.exports = `');
    fs.appendFileSync(filePath, contactsJson);
    fs.appendFileSync(filePath, '`');

    res.render('contacts', { contacts, deleted: true });
  },
}



