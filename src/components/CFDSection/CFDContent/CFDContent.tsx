import { CTraderList, DxtradePlatformList, MT5PlatformsList } from '@cfd/components';
import { useAuthData } from '@deriv-com/api-hooks';

import { TradingAppCardLoader } from '@/components';
import { useRegulationFlags } from '@/hooks';

export const CFDContent = () => {
    const { regulationFlags } = useRegulationFlags();
    const { isSuccess: isRegulationAccessible, isEU } = regulationFlags;
    const { isAuthorized } = useAuthData();

    if (!isRegulationAccessible && isAuthorized)
        return (
            <div className='pt-16 lg:pt-24'>
                <TradingAppCardLoader />
            </div>
        );

    return (
        <div className='pt-16 space-y-16 lg:space-y-24 lg:pt-24'>
            <MT5PlatformsList />
            {!isEU && <CTraderList />}
            {!isEU && <DxtradePlatformList />}
        </div>
    );
};
