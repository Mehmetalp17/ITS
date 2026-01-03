import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../../services/authService';
import CustomSelect from '../../components/common/CustomSelect';
import './StudentList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const StudentList = () => {
    const [terms, setTerms] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState('');
    const [gradeFilter, setGradeFilter] = useState('all');
    const [studentTypeFilter, setStudentTypeFilter] = useState('all');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    // Toast notification helper
    const showToast = (message, type = 'info') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
    };

    // Fetch terms on component mount
    useEffect(() => {
        fetchTerms();
    }, []);

    // Fetch students when term or filters change
    useEffect(() => {
        if (selectedTerm) {
            fetchStudents();
        }
    }, [selectedTerm, gradeFilter, studentTypeFilter]);

    const fetchTerms = async () => {
        try {
            const response = await axios.get(`${API_URL}/terms`);
            setTerms(response.data);
            if (response.data.length > 0) {
                setSelectedTerm(response.data[0].id.toString());
            }
        } catch (error) {
            console.error('Error fetching terms:', error);
            setError('Dönemler yüklenirken hata oluştu.');
        }
    };

    const fetchStudents = async () => {
        setLoading(true);
        setError('');
        
        try {
            const user = authService.getCurrentUser();
            if (!user || !user.department) {
                setError('Kullanıcı bölümü bulunamadı.');
                setLoading(false);
                return;
            }

            const params = new URLSearchParams();
            if (gradeFilter !== 'all') params.append('gradeFilter', gradeFilter);
            if (studentTypeFilter !== 'all') params.append('studentTypeFilter', studentTypeFilter);

            const response = await axios.get(
                `${API_URL}/students/${user.department.id}/${selectedTerm}?${params.toString()}`
            );
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
            setError('Öğrenciler yüklenirken hata oluştu.');
        } finally {
            setLoading(false);
        }
    };



    const getGradeBadgeClass = (grade) => {
        if (grade === 'S') return 'grade-s';
        if (grade === 'U') return 'grade-u';
        return 'grade-ungraded';
    };

    const getGradeDisplay = (grade) => {
        if (grade === 'S') return 'S';
        if (grade === 'U') return 'U';
        return '-';
    };

    const handleViewDocument = async (internshipId, documentUrl) => {
        if (!documentUrl) {
            showToast('Döküman bulunamadı.', 'error');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/internship/${internshipId}/document-url`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.success && response.data.url) {
                window.open(response.data.url, '_blank');
            } else {
                showToast('Döküman URL\'si alınamadı.', 'error');
            }
        } catch (error) {
            console.error('Error fetching document URL:', error);
            showToast('Döküman yüklenirken hata oluştu.', 'error');
        }
    };

    const handleGenerateReport = async () => {
        try {
            const user = authService.getCurrentUser();
            if (!user || !user.department) {
                setError('Kullanıcı bölümü bulunamadı.');
                return;
            }

            setLoading(true);
            setError('');

            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/internship/generate-report`,
                {
                    termId: parseInt(selectedTerm),
                    departmentId: user.department.id,
                    gradeFilter: gradeFilter === 'all' ? null : gradeFilter,
                    studentTypeFilter: studentTypeFilter === 'all' ? null : studentTypeFilter
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    responseType: 'blob'
                }
            );

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            
            const termName = terms.find(t => t.id.toString() === selectedTerm)?.name || 'Donem';
            link.setAttribute('download', `Komisyon_Degerlendirme_Tutanagi_${termName.replace(/\s/g, '_')}.docx`);
            
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error generating report:', error);
            
            // Handle blob error responses
            if (error.response && error.response.data instanceof Blob) {
                try {
                    const text = await error.response.data.text();
                    const errorData = JSON.parse(text);
                    setError(errorData.error || 'Rapor oluşturulurken hata oluştu.');
                } catch (parseError) {
                    setError('Rapor oluşturulurken hata oluştu.');
                }
            } else if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Rapor oluşturulurken hata oluştu.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Öğrenci Listesi</h2>
            <p>Seçilen döneme ait staj yapan öğrencileri ve not durumlarını listeleyin.</p>

            {error && <div className="error-message" style={{ marginBottom: '20px' }}>{error}</div>}

            {/* Filtreler */}
            <div className="filters-card">
                <div className="filter-row">
                    <div className="filter-group">
                        <label>Dönem Seçiniz:</label>
                        <CustomSelect
                            options={terms.length === 0 
                                ? [{ value: '', label: 'Dönem bulunamadı' }] 
                                : terms.map(term => ({ value: term.id.toString(), label: term.name }))
                            }
                            value={selectedTerm}
                            onChange={(val) => setSelectedTerm(val)}
                            disabled={loading || terms.length === 0}
                            placeholder="Dönem Seçiniz"
                        />
                    </div>

                    <div className="filter-group">
                        <label>Puana Göre Filtrele:</label>
                        <CustomSelect
                            options={[
                                { value: 'all', label: 'Tümü' },
                                { value: 'S', label: 'Başarılı (S)' },
                                { value: 'U', label: 'Başarısız (U)' },
                                { value: 'ungraded', label: 'Puanlanmamış' }
                            ]}
                            value={gradeFilter}
                            onChange={(val) => setGradeFilter(val)}
                            disabled={loading}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Staj Tipi:</label>
                        <CustomSelect
                            options={[
                                { value: 'all', label: 'Tümü' },
                                { value: 'first', label: 'Zorunlu Staj 1' },
                                { value: 'second', label: 'Zorunlu Staj 2' }
                            ]}
                            value={studentTypeFilter}
                            onChange={(val) => setStudentTypeFilter(val)}
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>

            {/* Öğrenci Listesi Tablosu */}
            <div className="table-container-card">
                <div className="table-header-info">
                    <h3>{terms.find(t => t.id.toString() === selectedTerm)?.name || 'Seçili Dönem'} Staj Listesi</h3>
                    <span className="student-count">
                        {loading ? 'Yükleniyor...' : `${students.length} öğrenci`}
                    </span>
                </div>


                <div className="table-wrapper">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Numara</th>
                                <th>Ad Soyad</th>
                                <th>Önceki Staj Yeri</th>
                                <th>Mevcut Staj Yeri</th>
                                <th>Başlangıç Tarihi</th>
                                <th>Bitiş Tarihi</th>
                                <th>Staj Notu</th>
                                <th>Döküman</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '30px' }}>
                                        <i className="fa-solid fa-spinner fa-spin"></i> Yükleniyor...
                                    </td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '30px' }}>
                                        <i className="fa-solid fa-circle-info"></i> Seçili filtrelere uygun öğrenci bulunamadı.
                                    </td>
                                </tr>
                            ) : (
                                students.map((student, index) => {
                                    if (!student.currentInternship) return null;
                                    
                                    return (
                                        <tr key={`${student.id}-${student.currentInternship.id}`}>
                                            <td>{student.studentNumber}</td>
                                            <td>{student.name}</td>
                                            <td>
                                                {student.previousInternship 
                                                    ? student.previousInternship.company 
                                                    : <span className="no-data">-</span>
                                                }
                                            </td>
                                            <td>{student.currentInternship.company}</td>
                                            <td>{new Date(student.currentInternship.startDate).toLocaleDateString('tr-TR')}</td>
                                            <td>{new Date(student.currentInternship.endDate).toLocaleDateString('tr-TR')}</td>
                                            <td>
                                                <span className={`grade-badge ${getGradeBadgeClass(student.currentInternship.grade)}`}>
                                                    {getGradeDisplay(student.currentInternship.grade)}
                                                </span>
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn-view-document"
                                                    onClick={() => handleViewDocument(student.currentInternship.id, student.currentInternship.documentUrl)}
                                                    title="Dökümanı Görüntüle"
                                                >
                                                    <i className="fa-solid fa-file-pdf"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                
                <div className="table-footer">
                    <button 
                        className="btn-generate-report"
                        onClick={handleGenerateReport}
                        disabled={loading || students.length === 0}
                    >
                        <i className="fa-solid fa-file-signature"></i> 
                        Komisyon Değerlendirme Tutanağı Oluştur
                    </button>
                </div>
            </div>

            {/* Toast Notification */}
            {toast.show && (
                <div className={`toast-notification toast-${toast.type}`}>
                    <div className="toast-content">
                        <i className={`fa-solid fa-${
                            toast.type === 'success' ? 'check-circle' :
                            toast.type === 'error' ? 'exclamation-circle' :
                            toast.type === 'warning' ? 'exclamation-triangle' :
                            'info-circle'
                        }`}></i>
                        <span>{toast.message}</span>
                    </div>
                    <button className="toast-close" onClick={() => setToast({ show: false, message: '', type: '' })}>
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudentList;
