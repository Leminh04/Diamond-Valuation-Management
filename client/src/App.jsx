// Client/src/App.js
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/guest/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Verify from './pages/MailVerify';
import ForgotPassword from './pages/PasswordForgot';
import ResetPassword from './pages/PasswordReset';
import PasswordMailVerify from './pages/PasswordMailVerify';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/userContext';
import { ConsultantContextProvider } from './context/ConsultantContext';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ConsultantDashboardLayout from './pages/consultant/ConsultantDashboardLayout';
import AppraiserDashboard from './pages/appraiser/AppraiserDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';

import ViewUsers from './pages/admin/ViewUsers';
import ViewStaffs from './pages/admin/ViewStaffs';
import AddingForm from './pages/admin/AddingForm';

import AboutUsGuest from './pages/guest/AboutUsGuest';
import ConsultingServicesGuest from './pages/guest/ConsultingServicesGuest';
import ValuationTool from './pages/guest/ValuationTool';

import BookingForm from './pages/customer/BookingForm';
import AboutUsCustomer from './pages/customer/AboutUsCustomer';
import ConsultingServicesCustomer from './pages/customer/ConsultingServicesCustomer';
import RecordTracking from './pages/customer/RecordTracking';
import CommitRequest from './pages/customer/CommitRequest';
import CommitmentRequests from './pages/consultant/CommitmentRequestView';
import CommitmentRequestDetail from './pages/consultant/CommitmentRequestViewDetail';


import PendingRequests from './pages/consultant/PendingRequests';
import RequestViewDetail from './pages/consultant/RequestViewDetail';
import AppointmentCalendar from './pages/consultant/AppointmentCalendar';
import AppointmentViewDetail from './pages/consultant/AppointmentViewDetail';
import Receipt from './pages/consultant/Receipt';
import GenerateReceiptForm from './pages/consultant/ReceiptForm';
import ReceiptDetail from './pages/consultant/ReceiptDetail';
import RecordView from './pages/consultant/RecordView';
import RecordViewDetail from './pages/consultant/RecordViewDetail';
import RecordSealing from './pages/consultant/RecordSeal';
import ConsulatantSealStatus from './pages/consultant/SealStatus';


import TaskView from './pages/appraiser/TaskView';
import ValuationRecordAppraiserDetail from './pages/appraiser/TaskViewDetail';
import TaskDoneView from './pages/appraiser/TaskDoneView';
import TaskDoneViewDetail from './pages/appraiser/TaskDoneViewDetail';
import RequestView from './pages/consultant/RequestView';

import ManagerCommitRequests from './pages/manager/CommitRequests';
import ManagerCommitRequestDetail from './pages/manager/CommitRequestDetail';
import ManagerSealingRequests from './pages/manager/SealRequest';
import ManagerSealRequestDetail from './pages/manager/SealRequestDetail';


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <ConsultantContextProvider>
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<PasswordMailVerify />} />
          <Route path="/reset-password/:userId" element={<ResetPassword />} />
          {/* Nested routes under AdminDashboard */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="users" element={<ViewUsers />} />
            <Route path="staff" element={<ViewStaffs />} />
            <Route path="add-user" element={<AddingForm />} />
          </Route>

          {/* Nested routes under ConsultantDashboard */}
          <Route path="/consultant" element={<ConsultantDashboardLayout />}>
            <Route index element={<PendingRequests />} />
            <Route path="requestView/:bookingId" element={<RequestView/>}/>
            <Route path="receipt" element={<Receipt/>}/>
            <Route path="requests/:bookingId" element={<RequestViewDetail />} />
            <Route path="appointments" element={<AppointmentCalendar />} />
            <Route path="appointments/:bookingId" element={<AppointmentViewDetail />} />
            <Route path="receipt-form/:bookingId" element={<GenerateReceiptForm />} />
            <Route path="receipts/:receiptId" element={<ReceiptDetail />} />
            <Route path="valuation-records" element={<RecordView />} />
            <Route path="valuation-records/:recordId" element={<RecordViewDetail />} />
            <Route path="commit-requests" element={<CommitmentRequests />} />
            <Route path="commit-requests/:commitId" element={<CommitmentRequestDetail />} />
            <Route path="record-sealing/:recordId" element={<RecordSealing />} />
            <Route path="seal-status" element={<ConsulatantSealStatus />} />
          </Route>

          {/* Nested routes under AppraiserDashboard */}
          <Route path="/appraiser" element={<AppraiserDashboard />}>
            <Route index element={<AppraiserDashboard />} />
            <Route path="task-view" element={<TaskView />} />
            <Route path="valuation-records/:recordId" element={<ValuationRecordAppraiserDetail />} />
            <Route path="task-done-view" element={<TaskDoneView />} />
            <Route path="task-view/:recordId" element={<TaskDoneViewDetail />} />
          </Route>

          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/commit-requests" element={<ManagerCommitRequests />} />
          <Route path="/manager/commit-requests/:commitId" element={<ManagerCommitRequestDetail />} />
          <Route path="/manager/seal-requests" element={<ManagerSealingRequests />} />
          <Route path="/manager/seal-requests/:sealId" element={<ManagerSealRequestDetail />} />



          <Route path="/about-us-guest" element={<AboutUsGuest />} />
          <Route path="/consulting-services-guest" element={<ConsultingServicesGuest />} />
          <Route path="/valuation-tool" element={<ValuationTool />} />

          <Route path="/about-us-customer" element={<AboutUsCustomer />} />
          <Route path="/consulting-services-customer" element={<ConsultingServicesCustomer />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/record-tracking" element={<RecordTracking />} />
          <Route path="/request-commit/:recordId" element={<CommitRequest />} />
        </Routes>
      </ConsultantContextProvider>
    </UserContextProvider>
  );
}

export default App;
