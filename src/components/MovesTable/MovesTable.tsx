import { useState } from 'react';
import { Select, Card, Table } from 'antd';
import { useAppSelector } from '../../store/hooks';
import { getGroupedPokemonMoves } from '../../store/cardListSlice/selectors';
import { LearnMethod } from '../../types';

const { Option } = Select;

const MovesTable = ({ learnMethod }: { learnMethod: LearnMethod }): JSX.Element => {
  const movesData = useAppSelector(getGroupedPokemonMoves);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => text,
    },
  ];

  if (!movesData) {
    return <></>;
  }

  return (
    <Table
      dataSource={movesData[learnMethod]}
      columns={columns}
      scroll={{ y: 50 }}
      pagination={false}
    />
  );
};

const MovesTableContainer = () => {
  const [learnMethod, setLearnMethod] = useState<LearnMethod>(LearnMethod['level-up']);

  return (
    <Card className="pokemon-moves">
      <div className="title-container">
        <Select
          defaultValue={LearnMethod['level-up']}
          style={{ width: 120 }}
          onChange={setLearnMethod}
        >
          <Option value="level-up">Level Up</Option>
          <Option value="machine">Machines</Option>
          <Option value="egg">Egg</Option>
          <Option value="tutor">Tutor</Option>
        </Select>
      </div>
      <MovesTable learnMethod={learnMethod} />
    </Card>
  );
};

export default MovesTableContainer;
