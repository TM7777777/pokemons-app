import styles from './PropertyTable.module.scss';

interface Props {
  data: Array<{
    name: string;
    value: string | number;
  }>;
}

const PropertyTable = ({ data }: Props): JSX.Element => (
  <table className={styles['property-table']}>
    <tbody>
      {data.map((item, index) => (
        <tr key={`${item.name}-${index}`}>
          {Object.entries(item).map(([key, value], idx) => (
            <td key={`${key}-${idx}`}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default PropertyTable;
