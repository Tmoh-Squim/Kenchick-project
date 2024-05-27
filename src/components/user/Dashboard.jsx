import { Card, Col, Row, Space, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import {Bar, Line, Pie} from "@ant-design/charts"
import React from 'react'

const barData = [
  {
    type:'Category',
    value:27,
  },
  {
    type:'Category b',
    value:18,
  },
  {
    type:'Category c',
    value:23,
  }
];
const pieData = [
  {
    type:'Category',
    value:27,
  },
  {
    type:'Category b',
    value:18,
  },
  {
    type:'Category c',
    value:23,
  },
  {
    type:'Category d',
    value:32,
  }
];
const Dashboard = () => {
  const barConfig ={
    data:barData,
    xField:'type',
    yField:'type',
    seriesField:'type',
    legend:{position:'top-left'},
    color:['#5B8FF9','#5AD8A6','#5D7092'],
    bardWidthRatio:0.6,
    label:{
      style:{
        fill:'#FFFFFF',
        opacity:0.6
      }
    }
  }
  const pieConfig ={
    data:pieData,
    angleField:'value',
    colorField:'type',
    radius:1,
    interactions:[{type:'element-active'}],
    color:['#5B8FF9','#5AD8A6','#5D7092','#F6BD16'],
    label:{
      style:{
        fill:'#000',
        fontSize:14
      }
    }
  }
  return (
    <Content>
      <Space direction='horizontal'>
        <Row gutter={20}>
          <Col span={12}>
          <Card >
          <Typography.Title>
            Orders
          </Typography.Title>
          <Typography.Paragraph>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam harum modi omnis explicabo eligendi nostrum voluptatem facere molestias quis placeat?
          </Typography.Paragraph>
        </Card>
          </Col>
       
        <Card >
          <Typography.Title>
            Products
          </Typography.Title>
        </Card>
        <Card >
          <Typography.Title>
            Users
          </Typography.Title>
        </Card>
        </Row>
        
      </Space>
      <Card >
        <h1>Order statistics</h1>
      <Pie {...pieConfig} height={300} layout={'horizontal'}/>
      </Card>
    
    </Content>
  )
}

export default Dashboard