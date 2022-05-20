const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.bold.inverse("New note added!"))
    } else {
        console.log(chalk.red.bold.inverse("Note title taken!"))
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    // for (let i = 0; i < notes.length; i++) {
    //     if (notes[i].title === title) {
    //         notes.splice(i, 1)
    //     }
    // }
    const notesToKeep = notes.filter(note => note.title !== title)
    if (notesToKeep.length === notes.length) {
        console.log(chalk.red.bold.inverse("Note not found!"))
    } 
    else {
        console.log(chalk.green.bold.inverse("Note Removed!"))
        saveNotes(notesToKeep)
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.bold.inverse("Your Notes:"))
    console.log(chalk.bold.white("-----------------------"))
    notes.forEach(note => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)
    if (note) {
        console.log(chalk.white.inverse.bold(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse.bold("Note not found!"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}

// export getNotes