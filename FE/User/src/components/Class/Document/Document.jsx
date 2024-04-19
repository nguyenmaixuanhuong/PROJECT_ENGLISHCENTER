import './Document.style.scss'
function Document({file}) {
    let document;
    const image = ['jpg','png','gif','jpeg']
    const extension = file.name.split('.').pop().toLowerCase();
    if (extension === 'pdf') {
        document = <div className="document-item">
            <img src="/assets/image/other/pdf.png" width={50} height={50} alt="" />
            <p>{file.name}</p>
        </div>;
    } 
    else if (extension === 'docx') {
        document = <div className="document-item">
            <img src="/assets/image/other/doc.png" width={50} height={50} alt="" />
            <p>{file.name}</p>
        </div>;
    } 
    else if(image.includes(extension)){
        document = <div className="document-item">
        <img src={file.url} width={50} height={50} alt="" />
        <p>{file.name}</p>
    </div>;
    }
    else {
            document = <div className="document-item">
                <img src="/assets/image/other/new-document.png" width={50} height={50} alt="" />
                <p className='filename'>{file.name}</p>
            </div>;
    }

    return (
        <div className="">{document}</div>
    );
}

export default Document;