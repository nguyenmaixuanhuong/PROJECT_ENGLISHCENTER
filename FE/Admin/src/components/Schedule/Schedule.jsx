import * as React from 'react';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import './styles.scss';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  DragDropProvider,
  Toolbar,
  DateNavigator,
  TodayButton,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState } from "react";
import { getClass } from '../../services/class.api';
import { getAllSchedule, createSChedule, updateSchedule, deteleSchedule } from '../../services/schedule.api';
import { getAllClass } from '../../services/class.api.js';
import { getRooms } from '../../services/room.api.js';
import { getListTeacher } from '../../services/teacher.api.js'

export default () => {
  const [data, setData] = React.useState([]);
  const [listClass, setListClass] = React.useState([]);
  const [listRoom, setListRoom] = React.useState([]);
  const [teacher, setTeacher] = React.useState([]);
  const [idClass, setIdClass] = React.useState([]);
  const [resources, setResources] = useState([]);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  async function loadSchedules() {
    try {
      const data = await getAllSchedule();
      setData(data);
    } catch (error) {
      console.error('Error loading Rooms:', error);
    }
  }
  async function loadRooms() {
    try {
      const data = await getRooms();

      const room_source = data.map((room) => {
        return { id: room._id, text: room.name };
      });
      setListRoom(room_source);
    } catch (error) {
      console.error('Error loading Rooms:', error);
    }
  }

  async function loadClasses() {
    try {
      const data = await getAllClass();

      const classes_source = data
        .filter(classes => classes.isFinish !== true) // Lọc ra các lớp học có isFinish không bằng false
        .map(classes => ({ id: classes._id, text: classes.className }));
      setListClass(classes_source);
    } catch (error) {
      console.error('Error loading classess:', error);
    }
  }
  async function loadTeachers() {
    try {
      const data = await getListTeacher();
      setTeacher(data)
    } catch (error) {
      console.error('Error loading Teachers:', error);
    }
  }
  useEffect(() => {
    // Load dữ liệu học viên khi component được mount
    loadTeachers()
    loadClasses()
    loadRooms()
  }, []);

  useEffect(() => {
    // Load dữ liệu học viên khi component được mount
    loadSchedules()
  }, [data]);

  const updateTeacherResources = (newTeacher) => {
    // Tìm index của resource có fieldName là 'teacherId'
    const teacherIndex = resources.findIndex(resource => resource.fieldName === 'teacher');
    if (teacherIndex !== -1) { // Nếu tìm thấy resource có fieldName là 'teacherId'
      // Tạo một bản sao của resources để tránh thay đổi trực tiếp state
      const updatedResources = [...resources];
      // Cập nhật giá trị instances của resource có fieldName là 'teacherId' bằng newTeacher
      updatedResources[teacherIndex].instances = newTeacher;
      // Cập nhật state resources
      setResources(updatedResources);
    }
  };

  const classID = document.getElementsByClassName('MuiSelect-nativeInput');
  useEffect(() => {
    setIdClass(classID[0]?.value)
  }, [classID[0]?.value])


  useEffect(() => {
    // if (idClass) {
    getClass(idClass)
      .then(teacherByClass => {
        if (teacherByClass) {
          const listTeacher = teacherByClass.teachers.map((item) => {
            return { id: item._id, text: item.fullName };
          })
          setTeacher(teacherByClass.teachers)
          updateTeacherResources(listTeacher);
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
    // }
  })

  useEffect(() => {
    setResources([
      {
        fieldName: 'class',
        title: 'Lớp Học',
        instances: listClass,
      },
      {
        fieldName: 'room',
        title: 'Room',
        instances: listRoom,
      },
      {
        fieldName: 'teacher',
        title: 'Giáo Viên',
        instances: teacher,
      },
    ]);
  }, [listClass, listRoom]);

  const [currentDate, setCurrentDate] = useState('2018-06-27');

  const currentDateChange = (date) => {
    setCurrentDate(date);
  };

  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = React.useState(false);

  const {
    allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging,
  } = editingOptions;

  const checkSchedule = (appointment) => {
    for (const item of data) {
      if (appointment.startDate >= new Date(item.startDate) && appointment.startDate < new Date(item.endDate)
        || (appointment.endDate >= new Date(item.startDate) && appointment.endDate < new Date(item.endDate))) {
        if (appointment.room === item.room) {
          setSuccess(false);
          setError('Phòng này đã có lớp học')
          setOpenSnackbar(true)
          return true;
        }
        else if (appointment.teacher === item.teacher) {
          setError('Giáo viên này đã có tiết dạy')
          setOpenSnackbar(true)
          return true;
        }
      }
    }
    setError('')
    return false;
  }
  const onCommitChanges = React.useCallback(async ({ added, changed, deleted }) => {
    if (added) {
      if (checkSchedule(added)) {
        setError('Lịch vừa tạo đã bị trùng vui lòng sắp lại lịch khác ')
        setOpenSnackbar(true)
      }
      else {
        if (createSChedule(added)) {
          console.log('them thanh cong');
        }
      }
    }
    else if (changed) {
      if (checkSchedule(changed)) {
        setError('Lịch vừa chỉnh sửa đã bị trùng vui lòng sắp lại lịch khác ')
        setOpenSnackbar(true)
      }
      else {
        for (const item of data) {
          if (changed[item.id]) {
            const schedule = {
              id: item.id,
              update: changed[item.id]
            }
            if (updateSchedule(schedule)) {
              setSuccessMessage('Cập nhật lịch thành công')
              setSuccess(true)
              setOpenSnackbar(true)
            }
            else {
              setError('Đã có lỗi xảy ra vui lòng thử lại')
              setOpenSnackbar(true)
            }
            break;
          }
        }
      }
    }
    else if (deleted !== undefined) {
      if (deteleSchedule(deleted)) {
        setSuccessMessage('Đã xóa lịch thành công')
        setSuccess(true)
        setOpenSnackbar(true)
      }
      else {
        setError('Đã có lỗi xảy ra vui lòng thử lại')
        setOpenSnackbar(true)
      }
    }
    setIsAppointmentBeingCreated(false);
  }, [setData, setIsAppointmentBeingCreated, data]);

  // const name = document.getElementsByClassName('VerticalAppointment-title')
  const onAddedAppointmentChange = React.useCallback((appointment) => {
    checkSchedule(appointment)
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);

  });


  const TimeTableCell = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => (
    <WeekView.TimeTableCell
      {...restProps}
      onDoubleClick={allowAdding ? onDoubleClick : undefined}
    />
  )), [allowAdding]);

  const CommandButton = React.useCallback(({ id, ...restProps }) => {
    if (id === 'deleteButton') {
      return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
    }
    return <AppointmentForm.CommandButton id={id} {...restProps} />;
  }, [allowDeleting]);


  const allowDrag = React.useCallback(
    () => allowDragging && allowUpdating,
    [allowDragging, allowUpdating],
  );
  const allowResize = React.useCallback(
    () => allowResizing && allowUpdating,
    [allowResizing, allowUpdating],
  );

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  return (
    <React.Fragment>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {success ?
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
            {successMessage}
          </MuiAlert>
          :
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
            {error}
          </MuiAlert>
        }
      </Snackbar>
      <Paper>
        <Scheduler
          data={data}
          height={600}
        >
          <ViewState
            ccurrentDate={currentDate}
            onCurrentDateChange={currentDateChange}
          />
          <EditingState
            onCommitChanges={onCommitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />

          <IntegratedEditing />
          <WeekView
            startDayHour={9}
            endDayHour={19}
            timeTableCellComponent={TimeTableCell}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />

          <AppointmentTooltip
            showOpenButton
            showDeleteButton={allowDeleting}
          />
          <AppointmentForm
            commandButtonComponent={CommandButton}
            readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
          />

          <Resources data={resources} mainResourceName="class" />
          <DragDropProvider
            allowDrag={allowDrag}
            allowResize={allowResize}
          />
        </Scheduler>
      </Paper>
    </React.Fragment>
  );
};
