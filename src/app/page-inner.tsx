"use client";
import {IcDataTable} from "@ukic/canary-react";
import {IcDataTableColumnObject} from "@ukic/canary-web-components";
import React from "react";
import {IcStatusTag, IcTooltip, IcTypography} from "@ukic/react";
import {DateTime} from "luxon"

export default function PageInner() {
    const columns: IcDataTableColumnObject[] = [
        {
            key: 'created',
            title: 'Created',
            dataType: 'string',
        },
        {
            key: 'first',
            title: 'First name',
            dataType: 'string',
        },
        {
            key: 'middle',
            title: 'Middle name',
            dataType: 'string',
        },
        {
            key: 'last',
            title: 'Last name',
            dataType: 'string',
        },
        {
            key: 'status',
            title: 'Status',
            dataType: 'string',
        },
    ]

    type DataRow = {
        created: number
        first: string
        middle: string
        last: string
        status: string
    }

    const data: DataRow[] = [
        {
            created: DateTime.now().minus({ hours: 1 }).toMillis(),
            first: "Joe",
            middle: "Jenny",
            last: "Bloggs",
            status: "In progress"
        },
        {
            created: DateTime.now().minus({ hours: 2 }).toMillis(),
            first: "Joe",
            middle: "Jenny",
            last: "Bloggs",
            status: "In progress"
        },
        {
            created: DateTime.now().minus({ hours: 3 }).toMillis(),
            first: "Sarah",
            middle: "Penny",
            last: "Smith",
            status: "Review"
        },
        {
            created: DateTime.now().minus({ hours: 4 }).toMillis(),
            first: "Mark",
            middle: "Manny",
            last: "Bloggs",
            status: "Draft"
        },

    ]

    function formatTimestamp(ts: number, mode: 'hours' | 'full'): string {
        const date = DateTime.fromMillis(ts);
        if (mode === 'full') {
            return date.toFormat('HH:mm dd MMM');
        }
        return date.toRelative({ unit: 'hours', style: 'short' })!;
    }

    const renderCustomElements = (row: DataRow, index: number) => {
        return (
            <>
                <IcStatusTag
                    key={`status-${index}`}
                    label={'Seen'}
                    status="warning"
                    size="small"
                    variant="outlined"
                    slot={`status-${index}`}
                />
                <IcTooltip
                    key={`tooltip-${index}`}
                    slot={`created-${index}`}
                    label={formatTimestamp(row.created, 'full')}
                    target={`created-${index}`}
                    placement={'top'}
                >
                    <IcTypography id={`created-${index}`} variant={'body'} key={index}>
                        {formatTimestamp(row.created, 'hours')}
                    </IcTypography>
                </IcTooltip>
            </>
        )
    }

    return (
        <IcDataTable caption={"Hello"} columns={columns} data={data} sortable>
            {data.map((row, index) => renderCustomElements(row, index))}
        </IcDataTable>
    )
}