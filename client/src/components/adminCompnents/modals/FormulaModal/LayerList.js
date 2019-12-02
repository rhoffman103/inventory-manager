import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LayerList = ({ layer, layerName }) => (
    <Row className='border mx-0 mb-2'>
        { layer.materials.map((material, index) => (
            <Col
                xs={3}
                key={`${layerName}-${material.name}-${index}`}
                className='border-right'
            >
                <span>{material.name} {material.percent}%</span>
            </Col>
        )) }
    </Row>
);

export default LayerList;