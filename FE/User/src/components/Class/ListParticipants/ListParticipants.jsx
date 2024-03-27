import './ListParticipants.style.scss'
import * as React from 'react';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
function ListParticipants({ teachers, students }) {
    return (
        <div className="participants">
            <div className="teachers">
                <div className="title">
                    <h3>GIÁO VIÊN</h3>
                    <span>
                        {teachers.length} giáo viên
                    </span>
                </div>
                <div className="listteacher">
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 150,
                            '& ul': { padding: 0 },
                        }}
                        subheader={<li />}
                    >
                        {teachers && teachers.map(teacher =>
                            <div className="d-flex mb-4">
                                <Avatar alt="Remy Sharp" sx={{ mr: 3 }} src={teacher.account.avatar?.url} />
                                <h5 className='name_participant'>{teacher.fullName}</h5>
                            </div>
                        )}
                    </List>

                </div>
            </div>
            <div className="students">
                <div className="title">
                    <h3>HỌC VIÊN</h3>
                    <span>
                        {students.length} học viên
                    </span>
                </div>
                <div className="liststudent ">
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 420,
                            '& ul': { padding: 0 },
                        }}
                        subheader={<li />}
                    >
                        {students && students.map(student =>
                            <div className="d-flex mb-4">
                                <Avatar alt="Remy Sharp" sx={{ mr: 3 }} src={student.account.avatar?.url} />
                                <h5 className='name_participant'>{student.fullName}</h5>
                            </div>
                        )}
                    </List>

                </div>
            </div>
        </div>
    );
}

export default ListParticipants;