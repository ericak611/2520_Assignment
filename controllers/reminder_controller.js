let database = require("../database");
const fs = require("fs")

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    console.log(database.cindy.reminders)
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    let reminderToFind = parseInt(req.params.id);
    let newTitle = req.body.title
    let newCompleted = req.body.completed
    let newDescription = req.body.description
    
    for (let i = 0; i < database.cindy.reminders.length; i++) {
      if (database.cindy.reminders[i].id == reminderToFind) {

        if (newCompleted.toLowerCase() == 'true') {
          newCompleted = true
        } else {
          newCompleted = false
        }

        database.cindy.reminders[i]["id"] = reminderToFind
        database.cindy.reminders[i]["title"] = newTitle
        database.cindy.reminders[i]["description"] = newDescription
        database.cindy.reminders[i]["completed"] = newCompleted

      }
    } 
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
    let reminderToFind = parseInt(req.params.id) 

    for (let i = 0; i < database.cindy.reminders.length; i++) { 
      if (database.cindy.reminders[i].id == reminderToFind) { 
        database.cindy.reminders.splice(i,1) 
      }
    } 
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
