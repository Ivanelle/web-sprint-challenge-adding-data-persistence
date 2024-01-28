// build your `Project` model here
const db = require('../../data/dbConfig')

function getProjects() {
 return db('projects');
}

async function addProject(project) {
    const projWDefaults = {
        ...project,
        project_completed: 
            project.project_completed !== undefined ? 
            project.project_completed : false
    }

    return db('projects').insert(projWDefaults).returning('*')


}

module.exports = {
    getProjects,
    addProject,
}
