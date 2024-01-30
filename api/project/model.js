// build your `Project` model here
const db = require('../../data/dbConfig')

function getProjects() {
 return db('projects')
    .then(projects => {
        const convertedProj = projects.map(project => ({
            ...project,
            project_completed: Boolean(project.project_completed),
        }))
        return convertedProj
    })
}

async function addProject(project) {

    try {

        const [newProject] = await db('projects')
            .insert(project)
            .returning([
                'project_id', 
                'project_name', 
                'project_completed', 
                'project_description'
            ])

        newProject.project_completed = Boolean(newProject.project_completed)

        return newProject

    } catch(err) {
        console.error('Error adding project', err)
    }


}

module.exports = {
    getProjects,
    addProject,
}
