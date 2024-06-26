import { useMemo } from 'react';

import { useTradingPlatformAccounts } from '@deriv-com/api-hooks';
import { CurrencyConstants, FormatUtils } from '@deriv-com/utils';

import { CFDPlatforms } from '@/cfd/constants';

export const useCtraderAccountsList = () => {
    const { data, ...rest } = useTradingPlatformAccounts({
        payload: { platform: 'ctrader' },
    });

    const { formatMoney } = FormatUtils;

    const modifiedAccounts = useMemo(() => {
        if (data) {
            const cTraderAccounts = data.filter(account => account.platform === CFDPlatforms.CTRADER);

            return cTraderAccounts.map(
                account =>
                    ({
                        ...account,
                        /** The platform for the account */
                        platform: 'ctrader',
                        /** indicating whether the account is a virtual-money account. */
                        is_virtual: account.account_type === 'demo',
                        /** The login id for the account */
                        loginid: account.account_id,
                        /** The balance of the account in currency format. */
                        display_balance: `${formatMoney(account.balance ?? 0, {
                            currency: account.currency as CurrencyConstants.Currency,
                        })} ${account.currency}`,
                    }) as const
            );
        }
    }, [data, formatMoney]);

    return { data: modifiedAccounts, ...rest };
};
