import BreadCrumbsIcon from '../../Components/Icons/BreadCrumbsIcon';
import ExcelLogo from '@/Components/Icons/ExcelLogo';
import FileUpload from '@/Components/Icons/FileUpload';
import HomeIcon from '@/Components/Icons/HomeIcon';
import {Student, Teacher, Message, Classroom, Speakup, Course, Announcement, Batch, Homework} from '@/Components/Icons/icons'


export default function SeeIcons(){
    return (
        <div>
            <BreadCrumbsIcon/>
            <ExcelLogo/>
            <FileUpload/>
            <HomeIcon/>
            <Student/>
            <Teacher/>
            <Message/>
        </div>
    )
}