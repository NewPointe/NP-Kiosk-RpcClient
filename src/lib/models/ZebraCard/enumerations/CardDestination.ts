/** Specifies the destination of the card following job completion. */
export const enum CardDestination {
    /** Sends the card to the eject bin. */
    Eject = 0,

    /** Sends the card to the reject bin. */
    Reject = 1,

    /** Holds the card inside the printer. */
    Hold = 2,

    /** Returns the card to the feeder. */
    Feeder = 3,

    /** Sends the card to the laminator for top lamination. */
    LaminatorTop = 4,

    /** Sends the card to the laminator for bottom lamination. */
    LaminatorBottom = 5,

    /** Sends the card to the laminator for top and bottom lamination. */
    LaminatorBoth = 6,

    /** Sends the card to the laminator for no lamination. */
    LaminatorNone = 7,

    /** Sends the card to the laminator regardless of installed laminate. */
    LaminatorAny = 8,
}
