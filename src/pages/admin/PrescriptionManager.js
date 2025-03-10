import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPrescriptions, deletePrescription, updatePrescription } from '../../services/api';
import DashboardMenu from '../../components/DashboardMenu';
import '../../styles/UserManager.css'; // Reusing the CSS from UserManager

const PrescriptionManager = ({ user }) => {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [editingPrescriptionId, setEditingPrescriptionId] = useState(null);
  const [editedPrescription, setEditedPrescription] = useState({});

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    } else {
      fetchPrescriptionsList();
    }
  }, [user, navigate]);

  const fetchPrescriptionsList = async () => {
    const prescriptions = await fetchPrescriptions();
    setPrescriptions(prescriptions);
  };

  const handleDelete = async (prescriptionId) => {
    await deletePrescription(prescriptionId);
    fetchPrescriptionsList();
  };

  const handleEdit = (prescription) => {
    setEditingPrescriptionId(prescription.id);
    setEditedPrescription(prescription);
  };

  const handleSave = async () => {
    await updatePrescription(editedPrescription);
    setEditingPrescriptionId(null);
    fetchPrescriptionsList();
  };

  return (
    <div className="user-manager-container">
      <DashboardMenu />
      <div className="user-manager-content">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Shop Item ID</th>
              <th>Approved</th>
              <th>Upload Date</th>
              <th>Approval Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>{prescription.id}</td>
                <td>{prescription.user_id}</td>
                <td>{prescription.shop_item_id}</td>
                <td>
                  {prescription.approved ? (
                    <i className="bi bi-check-circle-fill text-success"></i>
                  ) : (
                    <i className="bi bi-x-circle-fill text-danger"></i>
                  )}
                </td>
                <td>{new Date(prescription.upload_date).toLocaleDateString()}</td>
                <td>{prescription.approval_date ? new Date(prescription.approval_date).toLocaleDateString() : 'N/A'}</td>
                <td>
                  {editingPrescriptionId === prescription.id ? (
                    <button className="btn btn-success" onClick={handleSave}>Save</button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleEdit(prescription)}>Edit</button>
                  )}
                  <button className="btn btn-danger" onClick={() => handleDelete(prescription.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrescriptionManager;