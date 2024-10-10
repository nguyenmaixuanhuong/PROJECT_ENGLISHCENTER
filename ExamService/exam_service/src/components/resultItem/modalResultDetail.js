import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ResultQuestion from "@/components/resultItem/resultQuestion";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto'
};

export default function ModalResultDetail({ resultData, scoreParts }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleComment = (comments, type) => {
        switch (type) {
            case "Speaking":
                return <Typography textAlign={'justify'} variant='caption'>{comments}</Typography>
            case "Writing":
                return <Box>
                    <Typography textAlign={'justify'} variant='caption'><strong>Clarity:</strong> {comments.clarity}</Typography>
                    <br />
                    <Typography textAlign={'justify'} variant='caption'><strong>Grammar:</strong> {comments.grammar}</Typography>
                    <br />
                    <Typography textAlign={'justify'} variant='caption'><strong>Structure:</strong> {comments.structure}</Typography>
                    <br />
                    <Typography textAlign={'justify'} variant='caption'><strong>Vocabulary:</strong> {comments.vocabulary}</Typography>
                </Box>
            case "Choice" || "Listening":
                return <Box>
                    <Typography textAlign={'justify'} variant='caption'><strong>Feedback:</strong> {comments.feedback}</Typography>
                    <br />
                    {comments.studySuggestions &&
                        <Typography textAlign={'justify'} variant='caption'><strong>Suggest:</strong> {comments.studySuggestions}</Typography>
                    }
                </Box>
            default:
                return <Box>
                    <Typography textAlign={'justify'} variant='caption'><strong>Feedback:</strong> {comments.feedback}</Typography>
                    <br />
                    {comments.studySuggestions &&
                        <Typography textAlign={'justify'} variant='caption'><strong>Suggest:</strong> {comments.studySuggestions}</Typography>
                    }
                </Box>
        }
    }

    return (
        <div>
            <Button variant='contained' onClick={handleOpen}>Xem chi tiết kết quả</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon fontSize='large'></CloseIcon>
                    </IconButton>
                    <div >
                        <Typography textAlign={'center'} mb={3} mt={1} sx={{ backgroundColor: '#0a005a', color: 'white', p: 2, borderRadius: 3 }} variant="h4"> KẾT QUẢ </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor: '#fbfbfb', p: 2, }}>
                            <Typography variant="body1"> Bài kiểm tra: {resultData?.examSummary.title}</Typography>
                            <Typography variant="body1"> Thời gian: {resultData?.examSummary.times}</Typography>
                            {/* <Typography variant="body1"> Tổng điểm:  <span style={{ color: '#de0000' }}>{resultData.isPublicScore ? resultData.finalScore : 'Chờ chấm điểm'}</span> / {scoreExam}</Typography> */}
                        </Box>
                        {
                            resultData.parts.map((part, index) => (
                                <Box sx={{ mt: 3 }} key={part.partId}>
                                    <>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#fbfbfb', p: 2 }}>
                                            <Typography variant='h6' >
                                                Phần {part.partNumber}: {part.partTitle}
                                            </Typography>
                                            <Typography variant='body1'>Điểm: {scoreParts[index]} / {part.partScore}</Typography>

                                        </Box>
                                        {part.partPassage && <Box sx={{ backgroundColor: 'white', p: 2 }}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={15}
                                                value={part.partPassage}
                                            />
                                        </Box>
                                        }

                                        {part.partAudio.url && <Box sx={{ backgroundColor: 'white', p: 2 }}>
                                            <audio style={{ width: '100%' }} src={part.partAudio.url} controls />
                                        </Box>
                                        }
                                    </>
                                    <ul>
                                        {(part?.questions.length >= 2 ? [...part.questions].sort((a, b) => a.question.number - b.question.number) : part.questions)
                                            .map((item, itemIndex) => {
                                                return (
                                                    <>
                                                        <ResultQuestion
                                                            key={itemIndex}  // Đảm bảo mỗi câu hỏi có key riêng
                                                            type={part.partType === 'Custom' ? item.question.questionType : part.partType}
                                                            result={item}
                                                        />

                                                        {item.comments ? (
                                                            <Box sx={{ p: 2, backgroundColor: '#eeffee' }}>
                                                                {handleComment(item.comments, part.partType === 'Custom' ? item.question.questionType : part.partType)}
                                                            </Box>
                                                        ) : ''}
                                                    </>
                                                );
                                            })}

                                    </ul>
                                </Box>
                            ))
                        }

                    </div>
                </Box>
            </Modal>
        </div>
    );
}
