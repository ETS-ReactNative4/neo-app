import React from 'react';
import PropTypes from 'prop-types';
import {Space, Text} from '@pyt/micros';
import {Tooltip} from '@pyt/macros';
import {monetoryUnit} from '../../../utils/monetory/numberToWords';
import {useHistory} from 'react-router';

const Bar = ({
  data: {
    percentage,
    trail_status: {name, id},
    count,
    deal_size,
  },
}) => {
  const {push} = useHistory();
  const width = `${percentage}%`;
  return (
    <Space alignItems="center">
      <Space.Item width={['30%', '20%']}>
        <Text
          variant="tiny"
          color="grey01"
          numberOfLines={1}
          cursor="pointer"
          onPress={() => push(`/leads/?trail_status=${id}`)}>
          {count} {<span style={{color: grey02}}>({percentage}%)</span>}
        </Text>
      </Space.Item>
      <Space.Item width={['70%', '80%']}>
        <Space.Item width={width} alignSelf="center">
          <Tooltip prompt={`${count} leads, ${monetoryUnit(deal_size)}`}>
            <Space.Item
              width="100%"
              height={32}
              borderRadius={8}
              borderWidth={1}
              borderColor="grey02"
              backgroundColor="grey04"
              marginVertical={6}
              alignItems="center"
              justifyContent="center"
              cursor="default"
            />
          </Tooltip>
        </Space.Item>
        <Text
          variant="tiny"
          color="grey01"
          numberOfLines={1}
          position="absolute"
          top="50%"
          left="50%"
          transform={[
            {
              translateX: '-50%',
            },
            {
              translateY: '-50%',
            },
          ]}>
          {name}
        </Text>
      </Space.Item>
    </Space>
  );
};

Bar.propTypes = {
  data: PropTypes.any,
};

const Pipeline = ({loading, leads = []}) => {
  return (
    <Space gutter={24} direction="column">
      <Text variant="large-semibold">Sales Pipeline</Text>
      <Space.Item width="100%">
        {loading ? (
          <Text alignSelf="center" marginVertical="auto">
            Loading...
          </Text>
        ) : (
          leads.map((data, inx) => {
            return <Bar key={inx} data={data} />;
          })
        )}
      </Space.Item>
    </Space>
  );
};

Pipeline.propTypes = {
  loading: PropTypes.bool,
  leads: PropTypes.array,
};

export default Pipeline;
