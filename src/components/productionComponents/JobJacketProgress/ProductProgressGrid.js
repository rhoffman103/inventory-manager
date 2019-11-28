import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// const Cols = ({ rollProps }) => {
//     let borderClass = 'border-right';
//     return (
//         rollProps.reduce((property, index) => (
//             <>
//                 { (property.length  < (index - 1)) && borderClass = ''; }
//             </>
//         ))
//     );
// };

const ProductProgressGrid = ({ reportedProducts, needsRework }) => {
    
    if (!needsRework) needsRework = false;

    return (
        <div className='overflow-auto  mb-3'>
            <Row className='dark-theme border mx-0 py-2 min-w-618'>
                <Col xs={3} className='border-right'>Roll ID</Col>
                <Col xs={3} className='border-right'>Length</Col>
                <Col xs={3} className='border-right'>Weight</Col>
                <Col xs={3}>Position</Col>
            </Row>
            <Row className='border border-top-0 mx-0 min-w-618'>
                { reportedProducts.map((product, index) => (
                    needsRework === product.needsRework
                    ?   <React.Fragment key={`finished${product.tagId}-${index}`}>
                            <Col xs={3} className='border-right'>{ product.tagId }</Col>
                            <Col xs={3} className='border-right'>{ product.length }</Col>
                            <Col xs={3} className='border-right'>{ product.weight }</Col>
                            <Col xs={3}>{ product.position }</Col>
                        </React.Fragment>
                    :   <React.Fragment key={`reworkcol${product.tagId}-${index}`} />
                ))}
            </Row>
        </div>
    );
};

export default ProductProgressGrid;