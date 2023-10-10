import { useQuery } from 'react-query';
import useStore from '../../hooks/useStore';
import { get, post, put } from '../../queries/utils'

interface Fan {
    id: number;
    avatar: string;
    name: string;
    transactions_count: number;
    total_spent: number;
}

interface FansData {
    fans: Fan[];
}

export default function TopFans() {
    const currentCreator = useStore(state => state.currentCreator)
    const { data } = useQuery<FansData>(['top-fans', currentCreator], async () => {
        if (!!currentCreator) {
            const fans = await get(`/${currentCreator.creator_id}/fans/`)
            return { fans: fans }
        }
        return { fans: [] }
    });

    if (!data) return null

    return (
        <div className="top-fans">

            <div className="fan-header">
                <div>Fan</div>
                <div>Purchases</div>
                <div>Total Spent</div>
            </div>

            {data.fans.map(fan => (
                <div className="fan-row" key={fan.id}>
                    <div>
                        <img className='fan-avatar' src={fan.avatar} />
                        {fan.name}
                    </div>

                    <div>{fan.transactions_count}</div>
                    <div>${fan.total_spent}</div>
                </div>
            ))}

        </div>
    );
}