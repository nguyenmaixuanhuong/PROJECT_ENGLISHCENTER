import API from "./API";
export const createAssignment = async (assignment) => {
    try {
        const response = await API().post('/assignment/create',assignment);
        return response.data;
    } catch (error) {
        throw error;
    }        
}

export const listAllAssignment = async (idclass) => {
    try {
        const response = await API().get('/assignment/listall',{params: {class: idclass}});
        return response.data;
    } catch (error) {
        throw error;
    }        
}


export const listAssignmentsWithTeacher = async (idclass, idteacher) => {
    try {
        const response = await API().get('/assignment/listwithteacher',{params: {class: idclass, teacher: idteacher}});
        return response.data;
    } catch (error) {
        throw error;
    }        
}

export const getAssignment = async (id) => {
    try {
        const response = await API().get('/assignment/getassignment',{params: {id: id}});
        return response.data;
    } catch (error) {
        throw error;
    }        
}

export const submitAssignment = async (id,assignment) => {
    try {
        const response = await API().post('/assignment/submit',{id:id, assignment: assignment});
        return response.data;
    } catch (error) {
        throw error;
    }        
}

export const unSubmitAssignment = async (id,student) => {
    try {
        const response = await API().get('/assignment/unsubmit', {params:{id:id, student: student} });
        return response.data;
    } catch (error) {
        throw error;
    }        
}

export const markScore = async (id,student,score) => {
    try {
        const response = await API().post('/assignment/markscore', {id:id, student: student, score:score});
        return response.data;
    } catch (error) {
        throw error;
    }        
}