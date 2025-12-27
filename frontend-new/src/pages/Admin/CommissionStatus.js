import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import './CommissionStatus.css';

// Register fonts with pdfMake
if (pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
}

// API Configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const CommissionStatus = () => {
    const [commissionData, setCommissionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCommissionStatus();
    }, []);

    const fetchCommissionStatus = async () => {
        try {
            const response = await api.get('/commission-status');
            setCommissionData(response.data);
        } catch (err) {
            console.error('Error fetching commission status:', err);
            setError('Komisyon durumu yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleExportPDF = () => {
        // Prepare table body
        const tableBody = commissionData.map(item => [
            item.departmentName || '-',
            item.chairName || '-',
            item.member1 || '-',
            item.member2 || '-'
        ]);

        // Define PDF document
        const docDefinition = {
            content: [
                // Title
                {
                    text: 'Gebze Teknik Üniversitesi',
                    style: 'header',
                    alignment: 'center',
                    margin: [0, 0, 0, 5]
                },
                {
                    text: 'Staj Takip Sistemi',
                    style: 'header',
                    alignment: 'center',
                    margin: [0, 0, 0, 5]
                },
                {
                    text: 'Komisyon Durumu',
                    style: 'header',
                    alignment: 'center',
                    margin: [0, 0, 0, 10]
                },
                {
                    text: `Tarih: ${new Date().toLocaleDateString('tr-TR')}`,
                    alignment: 'center',
                    margin: [0, 0, 0, 20],
                    fontSize: 10
                },
                // Table
                {
                    table: {
                        headerRows: 1,
                        widths: ['40%', '20%', '20%', '20%'],
                        body: [
                            [
                                { text: 'Bölüm', style: 'tableHeader' },
                                { text: 'Başkan', style: 'tableHeader' },
                                { text: 'Üye 1', style: 'tableHeader' },
                                { text: 'Üye 2', style: 'tableHeader' }
                            ],
                            ...tableBody
                        ]
                    },
                    layout: {
                        fillColor: function (rowIndex) {
                            return rowIndex === 0 ? '#2980b9' : (rowIndex % 2 === 0 ? '#f3f3f3' : null);
                        },
                        hLineWidth: function () { return 0.5; },
                        vLineWidth: function () { return 0.5; },
                        hLineColor: function () { return '#cccccc'; },
                        vLineColor: function () { return '#cccccc'; }
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 16,
                    bold: true
                },
                tableHeader: {
                    bold: true,
                    fontSize: 11,
                    color: 'white',
                    fillColor: '#2980b9'
                }
            },
            defaultStyle: {
                fontSize: 9
            },
            pageMargins: [40, 60, 40, 60]
        };

        // Generate filename with date
        const dateStr = new Date().toLocaleDateString('tr-TR').replace(/\./g, '-');
        const filename = `komisyon-durumu-${dateStr}.pdf`;
        
        // Generate and download PDF
        pdfMake.createPdf(docDefinition).download(filename);
    };

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div>
            <h2>Komisyon Durumu Görüntüle</h2>

            <div className="table-container-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <h3>Tüm Komisyonlar</h3>
                        <p>Her bölümdeki komisyon başkanı ve üyeleri</p>
                    </div>
                    <button className="btn-export" onClick={handleExportPDF}>
                        <i className="fa-solid fa-file-pdf"></i>
                        PDF İndir
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {commissionData.length === 0 ? (
                    <div className="info-bar">
                        <i className="fa-solid fa-circle-info"></i>
                        Henüz atanmış komisyon bulunmamaktadır.
                    </div>
                ) : (
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Bölüm</th>
                                <th>Başkan</th>
                                <th>Üye 1</th>
                                <th>Üye 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commissionData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.departmentName}</td>
                                    <td>{item.chairName || '-'}</td>
                                    <td>{item.member1 || '-'}</td>
                                    <td>{item.member2 || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CommissionStatus;
