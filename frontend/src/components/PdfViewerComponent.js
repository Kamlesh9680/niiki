import React from "react";
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';

const PdfViewerComponent = () => {
    // Example PDF data
    const pdfFiles = [
        { id: 1, name: "Phone Pay", url: "/phonepe.pdf" },
        { id: 2, name: "Google Pay", url: "/GooglePay.pdf" },
        { id: 3, name: "Paytm", url: "/paytm.pdf" },
    ];

    return (
        <div className="page-wrapper max-w-[480px] mx-auto pb-8">
            <Header />
            <div className="page-container">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
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
                                className="flex justify-between items-center border border-customPurple rounded-md p-4"
                            >
                                <div>
                                    <h2 className="text-lg font-medium text-gray-700">{pdf.name}</h2>
                                </div>
                                <div className="flex space-x-2">
                                    <a
                                        href={pdf.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                    >
                                        View
                                    </a>
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
            <BottomNav />
        </div>
    );
};

export default PdfViewerComponent;