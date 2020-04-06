import React, { PureComponent } from 'react';
import { Row, Col, Tabs } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { InfoWindow, WorkingIndex, WorkingCalendar, Transaction, FunctionComponent, Warning } from './components';
import AbilityIntroduction from './blocks/AbilityIntroduction';
import AblityItems from './blocks/AblityItems';

class Dashboard extends PureComponent {
  render() {
    return <GridContent>
        <AblityItems />
        <AbilityIntroduction />
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            INSERT_BLOCK_PLACEHOLDER:Col24
          </Col>
        </Row>
        <Row className="rowBlock" gutter={10}>
          <Col span={12}>
            <Tabs className="tabStyle">
              <Tabs.TabPane tab="信息窗" key="1">
                <InfoWindow />
              </Tabs.TabPane>
              <Tabs.TabPane tab="个人工作指标" key="2">
                <WorkingIndex />
              </Tabs.TabPane>
            </Tabs>
          </Col>
          <Col span={12}>
            <Tabs className="tabStyle">
              <Tabs.TabPane tab="个人工作指标" key="1">
                <WorkingIndex />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        <Row className="rowBlock" gutter={10}>
          <Col span={12}>
            <Tabs className="tabStyle">
              <Tabs.TabPane tab="任务区" key="1">
                <Transaction />
              </Tabs.TabPane>
            </Tabs>
          </Col>
          <Col span={12}>
            <Tabs className="tabStyle">
              <Tabs.TabPane tab="功能区" key="2">
                <FunctionComponent />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        <Row className="rowBlock" gutter={10}>
          <Col span={12}>
            <Tabs className="tabStyle">
              <Tabs.TabPane tab="预警区" key="1">
                <Warning />
              </Tabs.TabPane>
            </Tabs>
          </Col>
          <Col span={12}>
            <Tabs className="tabStyle">
              <Tabs.TabPane tab="个人工作指标" key="2">
                <WorkingCalendar />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </GridContent>;
  }

}

export default Dashboard;