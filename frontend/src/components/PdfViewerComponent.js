import React, { useState } from "react";
import Modal from "react-modal";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";

// React Modal Styles
Modal.setAppElement("#root"); 
const modalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        maxWidth: "500px",
        height: "80%",
        overflow: "hidden",
        border: "1px solid #8b5cf6",
        borderRadius: "10px",
        padding: "0",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
};

const PdfViewerComponent = () => {
    const [selectedPdf, setSelectedPdf] = useState(null);

    // Example PDF data
    const pdfFiles = [
        { id: 1, name: "Phone Pay", url: "/phonepe.pdf", icon: '/phonepe-icon.webp' },
        { id: 2, name: "Google Pay", url: "/Googlepay.pdf", icon: 'gpay.webp' },
        { id: 3, name: "Paytm", url: "/paytm.pdf", icon: '/Paytm-Logo.wine.png' },
    ];

    const closeModal = () => setSelectedPdf(null);

    return (
        <div className="page-wrapper relative max-w-[480px] mx-auto pb-8">
            <Header />
            <div className="page-container">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                    <h1 className="text-2xl font-bold text-customPurple mb-4">
                        Guides Available
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Here are the documents available for your convenience.
                    </p>
                    <div className="space-y-4">
                        {pdfFiles.map((pdf) => (
                            <div
                                key={pdf.id}
                                className="flex flex-col gap-4 justify-between items-center border border-customPurple rounded-md p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <img src={pdf.icon} className="w-10" alt="icon" />
                                    <h2 className="text-lg font-medium text-gray-700">
                                        {pdf.name}
                                    </h2>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                        onClick={() => setSelectedPdf(pdf.url)}
                                    >
                                        View
                                    </button>
                                    <a
                                        href={pdf.url}
                                        download
                                        className="bg-customPurple text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for PDF Viewer */}
            <Modal
                isOpen={!!selectedPdf}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="PDF Viewer Modal"
            >
                <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center bg-customPurple text-white px-4 py-2">
                        <h2 className="text-lg font-semibold">PDF Viewer</h2>
                        <button
                            className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                    <div className="flex-grow">
                        <iframe
                            src={selectedPdf}
                            className="w-full h-full border-0"
                            title="PDF Viewer"
                        />
                    </div>
                </div>
            </Modal>
            <BottomNav />
        </div>
    );
};

const PdfViewerComponent2 = () => {
    const [selectedPdf, setSelectedPdf] = useState(null);

    // Example PDF data
    const pdfFiles = [
        { id: 1, name: "Phone Pay", url: "doc/upi/03.pdf", icon: '/phonepe-icon.webp' },
        { id: 2, name: "Google Pay", url: "doc/upi/01.pdf", icon: 'gpay.webp' },
        { id: 3, name: "Paytm", url: "doc/upi/02.pdf", icon: '/Paytm-Logo.wine.png' },
    ];

    const closeModal = () => setSelectedPdf(null);

    return (
        <div className="page-wrapper relative max-w-[480px] mx-auto pb-8">
            <Header />
            <div className="page-container">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                    <h1 className="text-2xl font-bold text-customPurple mb-4">
                        Guides Available
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Here are the documents available for your convenience.
                    </p>
                    <div className="space-y-4">
                        {pdfFiles.map((pdf) => (
                            <div
                                key={pdf.id}
                                className="flex flex-col gap-4 justify-between items-center border border-customPurple rounded-md p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <img src={pdf.icon} className="w-10" alt="icon" />
                                    <h2 className="text-lg font-medium text-gray-700">
                                        {pdf.name}
                                    </h2>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                        onClick={() => setSelectedPdf(pdf.url)}
                                    >
                                        View
                                    </button>
                                    <a
                                        href={pdf.url}
                                        download
                                        className="bg-customPurple text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for PDF Viewer */}
            <Modal
                isOpen={!!selectedPdf}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="PDF Viewer Modal"
            >
                <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center bg-customPurple text-white px-4 py-2">
                        <h2 className="text-lg font-semibold">PDF Viewer</h2>
                        <button
                            className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                    <div className="flex-grow">
                        <iframe
                            src={selectedPdf}
                            className="w-full h-full border-0"
                            title="PDF Viewer"
                        />
                    </div>
                </div>
            </Modal>
            <BottomNav />
        </div>
    );
};

const PdfViewerComponent3 = () => {
    const [selectedPdf, setSelectedPdf] = useState(null);

    // Example PDF data
    const pdfFiles = [
        { id: 1, name: "Transaction History", url: "doc/history.pdf", icon: '/phonepe-icon.webp' },
    ];

    const closeModal = () => setSelectedPdf(null);

    return (
        <div className="page-wrapper relative max-w-[480px] mx-auto pb-8">
            <Header />
            <div className="page-container">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                    <h1 className="text-2xl font-bold text-customPurple mb-4">
                        Guides Available
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Here are the documents available for your convenience.
                    </p>
                    <div className="space-y-4">
                        {pdfFiles.map((pdf) => (
                            <div
                                key={pdf.id}
                                className="flex flex-col gap-4 justify-between items-center border border-customPurple rounded-md p-4"
                            >
                                <div className="flex items-center gap-3">
                                    {/* <img src={pdf.icon} className="w-10" alt="icon" /> */}
                                    <h2 className="text-lg font-medium text-gray-700">
                                        {pdf.name}
                                    </h2>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                        onClick={() => setSelectedPdf(pdf.url)}
                                    >
                                        View
                                    </button>
                                    <a
                                        href={pdf.url}
                                        download
                                        className="bg-customPurple text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for PDF Viewer */}
            <Modal
                isOpen={!!selectedPdf}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="PDF Viewer Modal"
            >
                <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center bg-customPurple text-white px-4 py-2">
                        <h2 className="text-lg font-semibold">PDF Viewer</h2>
                        <button
                            className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                    <div className="flex-grow">
                        <iframe
                            src={selectedPdf}
                            className="w-full h-full border-0"
                            title="PDF Viewer"
                        />
                    </div>
                </div>
            </Modal>
            <BottomNav />
        </div>
    );
};

const PdfViewerComponent4 = () => {
    const [selectedPdf, setSelectedPdf] = useState(null);

    // Example PDF data
    const pdfFiles = [
        { id: 1, name: "Check balance", url: "doc/checkbalance.pdf", icon: '/phonepe-icon.webp' },
    ];

    const closeModal = () => setSelectedPdf(null);

    return (
        <div className="page-wrapper relative max-w-[480px] mx-auto pb-8">
            <Header />
            <div className="page-container">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                    <h1 className="text-2xl font-bold text-customPurple mb-4">
                        Guides Available
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Here are the documents available for your convenience.
                    </p>
                    <div className="space-y-4">
                        {pdfFiles.map((pdf) => (
                            <div
                                key={pdf.id}
                                className="flex flex-col gap-4 justify-between items-center border border-customPurple rounded-md p-4"
                            >
                                <div className="flex items-center gap-3">
                                    {/* <img src={pdf.icon} className="w-10" alt="icon" /> */}
                                    <h2 className="text-lg font-medium text-gray-700">
                                        {pdf.name}
                                    </h2>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                        onClick={() => setSelectedPdf(pdf.url)}
                                    >
                                        View
                                    </button>
                                    <a
                                        href={pdf.url}
                                        download
                                        className="bg-customPurple text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for PDF Viewer */}
            <Modal
                isOpen={!!selectedPdf}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="PDF Viewer Modal"
            >
                <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center bg-customPurple text-white px-4 py-2">
                        <h2 className="text-lg font-semibold">PDF Viewer</h2>
                        <button
                            className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                    <div className="flex-grow">
                        <iframe
                            src={selectedPdf}
                            className="w-full h-full border-0"
                            title="PDF Viewer"
                        />
                    </div>
                </div>
            </Modal>
            <BottomNav />
        </div>
    );
};

const PdfViewerComponent5 = () => {
    const [selectedPdf, setSelectedPdf] = useState(null);

    // Example PDF data
    const pdfFiles = [
        { id: 1, name: "Health Insurance", url: "doc/health-insurance.pdf", icon: '/phonepe-icon.webp' },
    ];

    const closeModal = () => setSelectedPdf(null);

    return (
        <div className="page-wrapper relative max-w-[480px] mx-auto pb-8">
            <Header />
            <div className="page-container">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                    <h1 className="text-2xl font-bold text-customPurple mb-4">
                        Guides Available
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Here are the documents available for your convenience.
                    </p>
                    <div className="space-y-4">
                        {pdfFiles.map((pdf) => (
                            <div
                                key={pdf.id}
                                className="flex flex-col gap-4 justify-between items-center border border-customPurple rounded-md p-4"
                            >
                                <div className="flex items-center gap-3">
                                    {/* <img src={pdf.icon} className="w-10" alt="icon" /> */}
                                    <h2 className="text-lg font-medium text-gray-700">
                                        {pdf.name}
                                    </h2>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                        onClick={() => setSelectedPdf(pdf.url)}
                                    >
                                        View
                                    </button>
                                    <a
                                        href={pdf.url}
                                        download
                                        className="bg-customPurple text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for PDF Viewer */}
            <Modal
                isOpen={!!selectedPdf}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="PDF Viewer Modal"
            >
                <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center bg-customPurple text-white px-4 py-2">
                        <h2 className="text-lg font-semibold">PDF Viewer</h2>
                        <button
                            className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                    <div className="flex-grow">
                        <iframe
                            src={selectedPdf}
                            className="w-full h-full border-0"
                            title="PDF Viewer"
                        />
                    </div>
                </div>
            </Modal>
            <BottomNav />
        </div>
    );
};
const PdfViewerComponent6 = () => {
    const [selectedPdf, setSelectedPdf] = useState(null);

    // Example PDF data
    const pdfFiles = [
        { id: 1, name: "Mutual Fund", url: "doc/mutualfund.pdf", icon: '/phonepe-icon.webp' },
    ];

    const closeModal = () => setSelectedPdf(null);

    return (
        <div className="page-wrapper relative max-w-[480px] mx-auto pb-8">
            <Header />
            <div className="page-container">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                    <h1 className="text-2xl font-bold text-customPurple mb-4">
                        Guides Available
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Here are the documents available for your convenience.
                    </p>
                    <div className="space-y-4">
                        {pdfFiles.map((pdf) => (
                            <div
                                key={pdf.id}
                                className="flex flex-col gap-4 justify-between items-center border border-customPurple rounded-md p-4"
                            >
                                <div className="flex items-center gap-3">
                                    {/* <img src={pdf.icon} className="w-10" alt="icon" /> */}
                                    <h2 className="text-lg font-medium text-gray-700">
                                        {pdf.name}
                                    </h2>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                        onClick={() => setSelectedPdf(pdf.url)}
                                    >
                                        View
                                    </button>
                                    <a
                                        href={pdf.url}
                                        download
                                        className="bg-customPurple text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for PDF Viewer */}
            <Modal
                isOpen={!!selectedPdf}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="PDF Viewer Modal"
            >
                <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center bg-customPurple text-white px-4 py-2">
                        <h2 className="text-lg font-semibold">PDF Viewer</h2>
                        <button
                            className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                    <div className="flex-grow">
                        <iframe
                            src={selectedPdf}
                            className="w-full h-full border-0"
                            title="PDF Viewer"
                        />
                    </div>
                </div>
            </Modal>
            <BottomNav />
        </div>
    );
};

export { PdfViewerComponent, PdfViewerComponent2, PdfViewerComponent3, PdfViewerComponent4, PdfViewerComponent5, PdfViewerComponent6 };
