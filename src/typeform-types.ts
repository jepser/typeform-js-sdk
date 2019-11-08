/* tslint:disable:no-import-side-effect no-namespace no-shadowed-variable */
export namespace Typeform {
  /**
   * Object that defines the Logic Jump's behavior.
   */
  export interface Action {
    /**
     * Behavior the Logic Jump will take.
     */
    action?: 'jump' | 'add' | 'subtract' | 'multiply' | 'divide'
    /**
     * Properties that further specify how the Logic Jump will behave.
     */
    details?: ActionDetails
    /**
     * Conditions for executing the Logic Jump. Conditions answer the question, "Under what circumstances?"
     * The condition object is the IF statement in your Logic Jump.
     */
    condition?: Condition | AndOrOperator
  }
  /**
   * Properties that further specify how the Logic Jump will behave.
   */
  export interface ActionDetails {
    /**
     * Specifies where the Logic Jump leads---to another field ("field"), a Hidden Field ("hidden"), or thank you screen ("thankyou").
     */
    to?: {
      /**
       * Logic Jump "to" option you are using.
       */
      type?: 'field' | 'hidden' | 'thankyou'
      /**
       * The "ref" value for the field, Hidden Field, or thank you screen the Logic Jump leads to.
       */
      value?: string
    }
    /**
     * Keeps a running total for the `score` or `price` variable.
     */
    target?: {
      /**
       * Specifies that the value is a variable.
       */
      type?: 'variable'
      /**
       * Variable value to use in calculation.
       */
      value?: 'score' | 'price'
    }
    /**
     * Specifies the numeric value to use in the calculation for the `score` or `price` variable.
     */
    value?: {
      /**
       * Specifies that the numeric value is a constant.
       */
      type?: 'constant'
      /**
       * Numeric value to use in calculation.
       */
      value?: number
    }
  }
  export namespace API {
    export namespace Forms {
      export interface List {
        total_items: number
        page_count: number
        items: {
          id: string
          title: string
          last_updated_at: string
          settings: {
          },
          self: {
            href: string
          },
          theme: {
            href: string
          },
          _links: {
            display: string
          }
        }[]
      }
    }
    export namespace Responses {
      export interface List {
        total_items: number
        page_count: number
        items: Response[]
      }
    }
    export namespace Webhooks {
      export interface List {
        items: Webhook[]
      }
    }
    export namespace Workspaces {
      export interface List {
        total_items: number
        page_count: number
        items: Workspace[]
      }
    }
    export interface PATCH {
      op: string
      path: string
      value: any
    }
  }
  /**
   * Base URL of Typeform API.
   */
  export type API_URL = 'https://api.typeform.com'
  /**
   * Attachment to include as image, video, or `picture_choice`.
   */
  export interface Attachment {
    /**
     * Type of attachment.
     */
    type?: 'image' | 'video'
    /**
     * URL for the image or video you want to display.
     * Images must already exist in your account---use the image's Typeform URL, such as `"https://images.typeform.com/images/kbn8tc98AHb"`.
     * For videos, use the video's YouTube.com URL.
     */
    href?: string
    /**
     * Optional parameter for responsively scaling videos. Available only for `"video"` type. Default value is 0.6
     */
    scale?: 0.4 | 0.6 | 0.8 | 1
  }
  /**
   * Choice answer for a properties's choices property of a field.
   */
  export interface Choice {
    /**
     * Readable name you can use to reference the answer choice. Available for `multiple_choice` and `picture_choice` types.
     * Not available for dropdown types.
     */
    ref?: string
    /**
     * Text for the answer choice.
     */
    label?: string
    /**
     * Identifies the image to use for the answer choice. Available only for `picture_choice` types.
     */
    attachment?: Attachment

  }
  /**
   * Argument object for Typeform API client
   */
  export interface ClientArg extends DocumentData {
    token?: string
  }
  /**
   * Conditions for executing the Logic Jump. Conditions answer the question, "Under what circumstances?"
   * The condition object is the IF statement in your Logic Jump.
   */
  export interface Condition {
    /**
     * Operator for the condition.
     */
    op?: 'begins_with' | 'ends_with' | 'contains' | 'not_contains' | 'lower_than' | 'lower_equal_than' | 'greater_than'
    | 'greater_equal_than' | 'is' | 'is_not' | 'equal' | 'not_equal' | 'always' | 'on' | 'not_on' | 'earlier_than' | 'earlier_than_or_on'
    | 'later_than' | 'later_than_or_on'
    /**
     * Object that defines the field type and value to evaluate with the operator.
     */
    vars?: {
      /**
       * Type of value the condition object refers to.
       */
      type?: 'field' | 'hidden' | 'variable' | 'constant' | 'end'
      /**
       * Value to check for in the "type" field to evaluate with the operator.
       */
      value?: any
    }[]
  }
  /**
   * Conditions for a logic jump can be combined using the `and` and `or` operators
   */
  export interface AndOrOperator {
  /**
   * Operator for the condition.
   */
    op?: 'and' | 'or'
  /**
   * Object that defines the field type and value to evaluate with the operator.
   */
    vars: AndOrOperator[] | Condition[]
  }
  /**
   * Generic document.
   */
  export interface DocumentData {
    [key: string]: any
  }
  /**
   * Object that represents a field in the form and its properties, validations, and attachments.
   */
  export interface Field {
    /**
     * The unique ID for the question.
     */
    id?: string
    /**
     * Readable name you can use to reference the field.
     */
    ref?: string
    /**
     * Unique name you assign to the field on this form.
     */
    title?: string
    /**
     * The type of field.
     */
    type?: Type
    /**
     * Properties of a field.
     */
    properties?: Properties.Field
    /**
     * Validations of a field.
     */
    validations?: Validations
    /**
     * Attachment of a field.
     */
    attachment?: Attachment
  }
  /**
   * Font for the theme.
   */
  export type Font = 'Acme' | 'Arial' | 'Arvo' | 'Avenir Next' | 'Bangers' | 'Cabin' | 'Cabin Condensed' | 'Courier' | 'Crete Round'
    | 'Dancing Script' | 'Exo' | 'Georgia' | 'Handlee' | 'Helvetica Neue' | 'Karla' | 'Lato' | 'Lekton' | 'Lobster' | 'Lora' | 'McLaren'
    | 'Montserrat' | 'Nixie One' | 'Old Standard TT' | 'Open Sans' | 'Oswald' | 'Playfair Display' | 'Quicksand' | 'Raleway' | 'Signika'
    | 'Sniglet' | 'Source Sans Pro' | 'Vollkorn'
  export interface Form {
    /**
     * ID of a form.
     */
    id?: string
    /**
     * Title to use for the form.
     */
    title?: string
    /**
     * Language to present a form.
     */
    language?: Language
    /**
     * Array of objects that specify the fields to use in the form and their properties, validations, and attachments.
     */
    fields?: Field[]
    /**
     * Default: `""`
     * Array of Hidden Fields to use in the form.
     */
    hidden?: string[]
    /**
     * Array of objects that specify settings and properties for the form's welcome screen.
     */
    welcome_screens?: WelcomeScreen[]
    /**
     * Array of objects that specify settings and properties for the form's thank you screen.
     */
    thankyou_screens?: ThankYouScreen[]
    /**
     * Array of Logic Jump objects to use in the form.
     */
    logic?: Logic[]
    /**
     * Theme to use for the form.
     * Treat as string when creating a form/
     */
    theme?: {
      /**
       * URL of the theme to use for the typeform.
       * If you don't specify a URL for the theme, Typeform applies a new copy of the default theme to the form.
       */
      href?: string
    } | string
    /**
     * Workspace that contains the form.
     */
    workspace?: {
      /**
       * URL of the workspace to use for the typeform.
       * If you don't specify a URL for the workspace, Typeform saves the form in the default workspace.
       */
      href?: string
    }
    /**
     * Only available when retrieving a form.
     */
    _links?: {
      display?: string
    }
    /**
     * Object that specifies form settings and metadata, including the language to use for the form,
     * whether the form is publicly available, the basis for the progress bar, and search engine indexing settings.
     */
    settings?: Settings
    /**
     * Object that keeps track of total score or price, if you use them in the form.
     * Not available when retrieving a form.
     */
    variables?: {
      /**
       * Recall Information for keeping score as users answer each question (for example, for quizzes).
       */
      score?: 0
      /**
       * Recall Information for tracking the total price of all items users select
       * (for example, for shopping carts, donation campaigns, and payment collections).
       */
      price?: number
    }
  }
  /**
   * HTTP Client for API requests.
   */
  export interface HTTPClient {
    request: (args: Request) => Promise<any>
  }
  /**
   * Typeform Image object.
   */
  export interface Image {
    /**
     * Unique ID for the image.
     */
    id?: string
    /**
     * URL for the image.
     */
    src?: string
    /**
     * File name for the image (specified when image is created).
     */
    file_name?: string
    /**
     * Width of the image in pixels.
     */
    width?: number
    /**
     * Height of the image in pixels.
     */
    height?: number
    /**
     * The MIME type of the image.
     */
    media_type?: 'image/gif' | 'image/jpeg' | 'image/png'
    /**
     * True if image has alpha channel (some degree of transparency). Otherwise, false.
     */
    has_alpha?: boolean
    /**
     * Average color of the image in hexadecimal format.
     */
    avg_color?: string
  }
  /**
   * Language that Typeform can be in.
   */
  export type Language = 'en' | 'es' | 'ca' | 'fr' | 'de' | 'ru' | 'it' | 'da' | 'pt' | 'ch' | 'zh' | 'nl' | 'no' | 'uk' | 'ja' | 'ko'
    | 'hr' | 'fi' | 'sv' | 'pl' | 'el' | 'hu' | 'tr' | 'cs' | 'et' | 'di'
  /**
   * Logic object of a form.
   */
  export interface Logic {
    /**
     * Specifies whether the Logic Jump is based on a question field or Hidden Field.
     */
    type?: 'field' | 'hidden'
    /**
     * Reference to the field that triggers the the Logic Jump.
     */
    ref?: string
    /**
     * Array of objects that define the Logic Jump's behavior.
     */
    actions?: Action[]
  }
  /**
   * Messages that forms can use.
   */
  export interface Messages {
    /**
     * Default tooltip button message. Maximum 28 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'label.buttonHint.default'?: string
    /**
     * Tooltip button message for long text blocks. Maximum 28 characters.
     * You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'label.buttonHint.longtext'?: string
    /**
     * Server connection error message. Maximum 128 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden
     */
    'label.warning.connection'?: string
    /**
     * Default continue button message. Maximum 100 characters.
     */
    'label.buttonNoAnswer.default'?: string
    /**
     * List of errors message. Maximum 128 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'label.warning.correction'?: string
    /**
     * Credit card name message. You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'block.payment.cardNameTitle'?: string
    /**
     * Credit card number message. You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'block.payment.cardNumberTitle'?: string
    /**
     * Credit card security number message
     */
    'block.payment.cvcDescription'?: string
    /**
     * Credit card CVC number message. You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'block.payment.cvcNumberTitle'?: string
    /**
     * Text input placeholder. Maximum 100 characters.
     */
    'block.shortText.placeholder'?: string
    /**
     * Invalid email error message. Maximum 64 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'label.error.emailAddress'?: string
    /**
     * Credit card expiry month message. You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'label.error.expiryMonthTitle'?: string
    /**
     * Credit card expiry year message. You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'label.error.expiryYearTitle'?: string
    /**
     * Fallback alert message. You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'label.warning.fallbackAlert'?: string
    /**
     * File upload button message. Maximum 34 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'block.fileUpload.choose'?: string
    /**
     * File upload dragging action message. Maximum 35 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'block.fileUpload.drag'?: string
    /**
     * Still processing file upload message. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'block.fileUpload.uploadingProgress'?: string
    /**
     * File too big error message. You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'label.error.sizeLimit'?: string
    /**
     * Private form error message. Accepts variable form:name. Maximum 128 characters.
     * You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'label.warning.formUnavailable'?: string
    /**
     * Incomplete fields error message. Maximum 42 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'label.error.incompleteForm'?: string
    /**
     * Key letter hint message. Maximum 100 characters.
     */
    'label.hint.key'?: string
    /**
     * Legal field deny message. You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'block.legal.reject'?: string
    /**
     * Legal field accept message. You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'block.legal.accept'?: string
    /**
     * Number maximum value tooltip message. Accepts variable `field:max`. Maximum 64 characters.
     * You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'label.error.maxValue'?: string
    /**
     * Text fields maximum length tooltip message. Accepts variable `field:max_length`. Maximum 64 characters.
     * You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'label.error.maxLength'?: string
    /**
     * Number minimum value tooltip message. Accepts variable `field:min`. Maximum 64 characters.
     * You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'label.error.minValue'?: string
    /**
     * Number minimum and maximum range value tooltip message. Accepts variables `field:min` and `field:max`. Maximum 64 characters.
     * You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'label.error.range'?: string
    /**
     * Choose as many as you like message for multiple choice fields. Maximum 45 characters.
     * You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'block.multipleChoice.hint'?: string
    /**
     * Required value error message. Maximum 64 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'label.error.mustEnter'?: string
    /**
     * Required selection error message. Maximum 64 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'label.error.mustSelect'?: string
    /**
     * Keyboard shortcut for the "No" option. Maximum 1 character.
     */
    'label.no.shortcut'?: string
    /**
     * Representation for the word "No." You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'label.no.default'?: string
    /**
     * Not suggestions found for dropdown fields error message. Maximum 64 characters.
     * You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'block.dropdown.hint'?: string
    /**
     * Other answer message. Maximum 100 characters.
     */
    'block.multipleChoice.other'?: string
    /**
     * Completion percentage message. Accepts variable `progress:percent`. Maximum 100 characters.
     */
    'label.progress.percent'?: string
    /**
     * Completion proportion message. Accepts variables `progress:step` and `progress:total`. Maximum 100 characters.
     */
    'label.progress.proportion'?: string
    /**
     * Required field error message. Maximum 64 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'label.error.required'?: string
    /**
     * Review fields error message. Accepts variable `form:unanswered_fields`. Maximum 64 characters.
     * You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'label.preview'?: string
    /**
     * Review button message. Maximum 100 characters.
     */
    'label.button.review'?: string
    /**
     * Server error message. Maximum 128 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'label.error.server'?: string
    /**
     * Share text message. Maximum 100 characters.
     */
    'label.action.share'?: string
    /**
     * Submit button message. Maximum 100 characters.
     */
    'label.button.submit'?: string
    /**
     * Successful submit message. Maximum 128 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'label.warning.success'?: string
    /**
     * Answer confirm. Maximum 100 characters.
     */
    'label.button.ok'?: string
    /**
     * Legal field terms and conditions message. Maximum 64 characters.
     * You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'label.error.mustAccept'?: string
    /**
     * Long text field tooltip message. Maximum 128 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'block.longtext.hint'?: string
    /**
     * Placeholder message with instructions for dropdown fields. Maximum 100 characters.
     */
    'block.dropdown.placeholder'?: string
    /**
     * Placeholder message with instructions for dropdown fields on touch devices. Maximum 100 characters.
     */
    'block.dropdown.placeholderTouch'?: string
    /**
     * Invalid URL error message. Maximum 64 characters. You can format messages with bold (`*bold*`) and italic (`_italic_`) text.
     * HTML tags are forbidden.
     */
    'label.error.url'?: string
    /**
     * Keyboard shortcut for the "Yes" option. Maximum 1 character.
     */
    'label.yes.shortcut'?: string
    /**
     * Representation for the word "Yes". You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
     */
    'label.yes.default'?: string
  }
  /**
   * Notification object.
   */
  export interface Notification {
    /**
     * Settings for notifications sent when respondents complete and submit the typeform.
     */
    self?: {
      /**
       * Default: `""`
       * true to send notifications. false to disable notifications.
       */
      enabled?: boolean
      recipients?: string[]
      /**
       * Email address to use for notification Reply-To.
       * Must be a Recall Information value based on respondent's answer to a field: {{field:ref}} or {{hidden:ref}}.
       */
      reply_to?: string
      /**
       * Subject to use for the notification email. Can combine text and Recall Information value from one or more fields.
       * Available Recall Information values are {{form:title}}, {{account:email}}, {{account:name}}, {{link:report}},
       * and standard Recall Information for fields {{field:ref}} and hidden fields {{hidden:ref}}.
       */
      subject?: string
      /**
       * Message to include in the body of the notification email. Can combine text and Recall Information value from one or more fields.
       * Available Recall Information values are {{form:title}}, {{account:email}}, {{account:name}}, {{link:report}},
       * {{form:all_answers}}, and standard Recall Information for fields {{field:ref}} and hidden fields {{hidden:ref}}.
       * You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
       */
      message?: string
    }
    /**
     * Settings for notifications sent to respondents immediately after submitting the typeform
     */
    respondent?: {
      /**
       * Default: `""`
       * true to send respondent notifications. false to disable respondent notifications.
       */
      enabled?: boolean
      /**
       * Email where respondent notification will be sent.
       * Must be a Recall Information value based on respondent's answer to a field: {{field:ref}} or {{hidden:ref}}.
       */
      recipient?: string
      reply_to?: string[]
      /**
       * Subject to use for the notification email. Can combine text and Recall Information value from one or more fields.
       * Available Recall Information values are {{form:title}}, {{account:fullname}}, {{account:email}}, {{account:name}},
       * {{link:report}}, and standard Recall Information for fields {{field:ref}} and hidden fields {{hidden:ref}}.
       */
      subject?: string
      /**
       * Message to include in the body of the notification email. Can combine text and Recall Information value from one or more fields.
       * Available Recall Information values are {{form:title}}, {{account:fullname}}, {{account:email}}, {{account:name}},
       * {{link:report}}, {{form:all_answers}}, and standard Recall Information for fields {{field:ref}} and hidden fields {{hidden:ref}}.
       * You can format messages with bold (`*bold*`) and italic (`_italic_`) text. HTML tags are forbidden.
       */
      message?: string
    }
  }
  /**
   * Properties object.
   */
  export namespace Properties {
    export interface Field {
      /**
       * Question or instruction to display for the field.
       */
      description?: string
      /**
       * Answer choices. Available for `dropdown`, `multiple_choice`, and `picture_choice` types.
       */
      choices?: Choice[]
      /**
       * Contains the fields that belong in a question group. Only `payment` and `group` blocks are not allowed inside a question group.
       * Available for the `group` type.
       */
      fields?: any[][]
      /**
       * true to allow respondents to select more than one answer choice. false to allow respondents to select only one answer choice.
       * Available for `multiple_choice` and `picture_choice` types.
       */
      allow_multiple_selection?: boolean
      /**
       * true if answer choices should be presented in a new random order for each respondent.
       * false if answer choices should be presented in the same order for each respondent.
       * Available for `multiple_choice` and `picture_choice` types.
       */
      randomize?: boolean
      /**
       * true to include an "Other" option so respondents can enter a different answer choice from those listed.
       * false to limit answer choices to those listed.
       * Available for `multiple_choice` and `picture_choice` types.
       */
      allow_other_choice?: boolean
      /**
       * true to list answer choices vertically. false to list answer choices horizontally.
       * Available for `multiple_choice` types.
       */
      vertical_alignment?: boolean
      /**
       * true if you want to use larger-sized images for answer choices. Otherwise, false. Available for `picture_choice` types.
       */
      supersized?: boolean
      /**
       * Default: `""`
       * true to show text labels and images as answer choices. false to show only images as answer choices.
       * Available for `picture_choice` types.
       */
      show_labels?: boolean
      /**
       * true if question should list dropdown answer choices in alphabetical order.
       * false if question should list dropdown answer choices in the order they're listed in the "choices" array.
       * Available for `dropdown` types.
       */
      alphabetical_order?: boolean
      /**
       * true if you want to display quotation marks around the statement on the form. Otherwise, false. Available for statement types.
       */
      hide_marks?: boolean
      /**
       * Default: `"Continue"`
       * Text to display in the button associated with the object. Available for `group`, `payment`, and `statement` types.
       */
      button_text?: string
      /**
       * Number of steps in the scale's range. Minimum is 5 and maximum is 11. Available for `opinion_scale` and `rating` types.
       */
      steps?: 5 | 6 | 7 | 8 | 9 | 10 | 11
      /**
       * Default: `"star"`
       * Shape to display on the scale's steps. Available for `opinion_scale` and `rating` types.
       */
      shape?: 'cat' | 'circle' | 'cloud' | 'crown' | 'dog' | 'droplet' | 'flag' | 'heart' | 'lightbulb' | 'pencil' | 'skull' | 'star'
      | 'thunderbolt' | 'tick' | 'trophy' | 'up' | 'user'
      /**
       * Label to help respondents understand the scale's range. Available for `opinion_scale` and `rating` types.
       */
      labels?: {
        /**
         * Text of the left-aligned label for the scale.
         */
        left?: string
        /**
         * Text of the right-aligned label for the scale.
         */
        right?: string
        /**
         * Text of the center-aligned label for the scale.
         */
        center?: string
      }
      /**
       * true if range numbering should start at 1. false if range numbering should start at 0. Available for `opinion_scale` types.
       */
      start_at_one?: boolean
      /**
       * Default: `"DDMMYYYY"`
       * Format for month, date, and year in answer. Available for `date` types.
       */
      structure?: 'MMDDYYYY' | 'DDMMYYYY' | 'YYYYMMDD'
      /**
       * Default: `"/"`
       * Character to use between month, day, and year in answer. Available for `date` types.
       */
      separator?: '/' | '-' | '.'
      currency?: 'AUD' | 'BRL' | 'CAD' | 'CHF' | 'DKK' | 'EUR' | 'GBP' | 'MXN' | 'NOK' | 'SEK' | 'USD'
    }
    export interface ThankYouScreen {
      /**
       * true to display a 'Submit' button on the thank you screen. Otherwise, false.
       */
      show_button?: boolean
      /**
       * Text to display on the 'Submit' button on the thank you screen.
       */
      button_text?: boolean
      /**
       * Specify whether the form should reload or redirect to another URL when respondents click the 'Submit' button. PRO+ feature.
       */
      button_mode?: 'reload' | 'redirect'
      /**
       * URL where the typeform should redirect after submission, if you specified "redirect" for `button_mode`.
       */
      redirect_url?: string
      /**
       * true to display social media sharing icons on the thank you screen so respondents can post your typeform's link on Facebook,
       * Twitter, LinkedIn, and Google+. Otherwise, false.
       */
      share_icons?: boolean
    }
    export interface WelcomeScreen {
      /**
       * Description of the welcome screen.
       */
      description?: string
      /**
       * true to display a 'Start' button on the welcome screen. Otherwise, false.
       */
      show_button?: boolean
      /**
       * Text to display on the 'Start' button on the welcome screen.
       */
      button_text?: boolean
    }
  }
  /**
   * Typeform request object.
   */
  export interface Request extends DocumentData {
    url: string
    method: string
    data?: DocumentData
    argsHeaders?: DocumentData
    params?: DocumentData
  }
  /**
   * Form response and date and time of form landing and submission.
   */
  export interface Response {
    /**
     * Unique ID for the response. Note that `response_id` values are unique per form but are not unique globally.
     */
    response_id?: string
    /**
     * Time of the form landing. In ISO 8601 format, UTC time, to the second, with T as a delimiter between the date and time.
     */
    landed_at?: string
    /**
     * Time that the form response was submitted. In ISO 8601 format, UTC time, to the second, with T as a delimiter between the date and time.
     */
    submitted_at?: string
    /**
     * Metadata about a client's HTTP request.
     */
    metadata?: {
      user_agent?: string
      /**
       * Derived from user agent
       */
      platform?: string
      referer?: string
      /**
       * Ip of the client
       */
      network_id?: string
    }
    hidden?: DocumentData
    /**
     * Subset of a complete form definition to be included with a submission.
     */
    definition?: {
      fields?: {
        id?: string
        type?: string
        title?: string
        description?: string
      }[]
    }
    answers?: {
      field?: {
        /**
         * The unique id of the form field the answer refers to.
         */
        id?: string
        /**
         * The field's type in the original form.
         */
        type?: string
        /**
         * The reference for the question the answer relates to. Use the `ref` value to match answers with questions.
         * The Responses payload only includes `ref` for the fields where you specified them when you created the form.
         */
        ref?: string
        /**
         * The form field's title which the answer is related to.
         */
        title?: string
      }
      /**
       * The answer-field's type.
       */
      type?: 'choice' | 'choices' | 'date' | 'email' | 'url' | 'file_url' | 'number' | 'boolean' | 'text' | 'payment'
      /**
       * Represents single choice answers for dropdown-like fields.
       */
      choice?: {
        label?: string
        other?: string
      }
      /**
       * Represents multiple choice answers.
       */
      choices?: {
        labels?: string[]
        other?: string
      }
      date?: string
      email?: string
      file_url?: string
      number?: number
      boolean?: boolean
      text?: string
      url?: string
      payment?: {
        amount?: string
        last4?: string
        name?: string
      }
    }[]
    calculated?: {
      score?: number
    }
  }
  /**
   * Typeform Form Settings object.
   */
  export interface Settings {
    /**
     * Language of form.
     */
    language?: Language
    /**
     * Default: `""`
     * true if your form is public. Otherwise, false (your form is private).
     */
    is_public?: boolean
    /**
     * Default: `"proportion"`
     * Basis for the progress bar displayed on the screen. Choose "proportion" to show the number of questions answered so far.
     * Choose "percentage" to show the percentage of questions answered so far.
     */
    progress_bar?: 'percentage' | 'proportion'
    /**
     * Default: `""`
     * true to display progress bar on the typeform. Otherwise, false.
     */
    show_progress_bar?: boolean
    /**
     * Default: `""`
     * true to display Typeform brand on the typeform. false to hide Typeform branding on the typeform.
     * Hiding Typeform branding is available for PRO+ accounts.
     */
    show_typeform_branding?: boolean
    meta?: {
      /**
       * Default: `""`
       * true to allow search engines to index your typeform. Otherwise, false.
       */
      allow_indexing?: boolean
      /**
       * Description for search engines to display for your typeform.
       */
      description?: string
      image?: {
        /**
         * URL of image for search engines to display for your typeform.
         */
        href?: string
      }
    }
    /**
     * URL where the typeform should redirect upon submission.
     */
    redirect_after_submit_url?: string
    /**
     * Google Analytics tracking ID to use for the form.
     */
    google_analytics?: string
    /**
     * Facebook Pixel tracking ID to use for the form.
     */
    facebook_pixel?: string
    /**
     * Google Tag Manager ID to use for the form.
     */
    google_tag_manager?: string
    /**
     * Notification object.
     */
    notification?: Notification
  }
  /**
   * A theme in your Typeform account.
   */
  export interface Theme {
    /**
     * Settings for the background.
     */
    background?: ThemeBackground
    /**
     * Colors the theme will apply to answers, background, buttons, and questions.
     */
    colors?: ThemeColors
    /**
     * Default: `"Source Sans Pro"`
     * Font for the theme.
     */
    font?: Font
    /**
     * `true` if buttons should be transparent. Otherwise, `false`.
     */
    has_transparent_button?: boolean
    /**
     * Unique ID of the theme.
     */
    id?: string
    /**
     * Name of the theme.
     */
    name?: string
    /**
     * Default: `"private"`
     * Specifies whether the theme is `public` (one of Typeform's built-in themes that are available in all accounts) or `private`
     * (a theme you created). You can only change `private` themes. You can't change Typeform's public themes.
     */
    visibility?: 'public' | 'private'
  }
  /**
   * Settings for a theme's background.
   */
  export interface ThemeBackground {
    /**
     * Background image URL.
     */
    href?: string
    /**
     * Default: `"fullscreen"`
     * Layout for the background.
     */
    layout?: 'fullscreen' | 'repeat' | 'no-repeat'
    /**
     * Brightness for the background. -1 is least bright (minimum) and 1 is most bright (maximum).
     */
    brightness?: number
  }
  /**
   * Colors the theme will apply to answers, background, buttons, and questions.
   */
  export interface ThemeColors {
    /**
     * Color the theme will apply to answers. Hexadecimal value.
     */
    answer?: string
    /**
     * Color the theme will apply to background. Hexadecimal value.
     */
    background?: string
    /**
     * Color the theme will apply to buttons. Hexadecimal value.
     */
    button?: string
    /**
     * Color the theme will apply to questions. Hexadecimal value.
     */
    question?: string
  }
  /**
   * Object that specifies the settings and properties for the form's thank you screen.
   */
  export interface ThankYouScreen {
    /**
     * Readable name you can use to reference the thank you screen.
     */
    ref?: string
    /**
     * Title for the thank you screen.
     */
    title?: string
    /**
     * Properties of a thank you screen
     */
    properties?: Properties.ThankYouScreen
    /**
     * Allows you to display images and videos.
     * Available for welcome and thank you screens, as well as `date`, `dropdown`, `email`, `group`, `long_text`, `multiple_choice`,
     * `number`, `opinion_scale`, `payment`, `rating`, `short_text`, `statement`, `phone_number`, and `yes_no` fields.
     */
    attachment?: Attachment
  }
  /**
   * The type of field.
   */
  type Type = 'date' | 'dropdown' | 'email' | 'file_upload' | 'group' | 'legal' | 'long_text' | 'multiple_choice' | 'number'
    | 'opinion_scale' | 'payment' | 'picture_choice' | 'rating' | 'short_text' | 'statement' | 'website' | 'yes_no' | 'phone_number'
  /**
   * Validations of a field.
   */
  export interface Validations {
    /**
     * true if respondents must provide an answer. Otherwise, false.
     * Available for `date`, `dropdown`, `email`, `file_upload`, `legal`, `long_text`, `multiple_choice`, `number`, `opinion_scale`,
     * `payment`, `picture_choice`, `rating`, `short_text`, `website`, `phone_number`, and `yes_no` types.
     */
    required?: boolean
    /**
     * Maximum number of characters allowed in the answer. Available for `long_text`, `number`, and `short_text` types.
     */
    max_length?: number
    /**
     * Maximum value allowed in the answer. Available for `number` types.
     */
    min_value?: number
    /**
     * Maximum value allowed in the answer. Available for number types.
     */
    max_value?: number
  }
  /**
   * Typeform Webhook object.
   */
  export interface Webhook {
    /**
     * Unique ID for the webhook.
     */
    id?: string
    /**
     * Unique ID for the typeform.
     */
    form_id?: string
    /**
     * Unique name you want to use for the webhook.
     */
    tag?: string
    /**
     * Webhook URL.
     */
    url?: string
    /**
     * True if you want to send responses to the webhook immediately. Otherwise, false.
     */
    enabled?: boolean
    /**
     * True if you want Typeform to verify SSL certificates when delivering payloads
     */
    verify_ssl?: boolean
    /**
     * Date and time when webhook was created.
     * In ISO 8601 format, UTC time, to the second, with T as a delimiter between the date and time.
     */
    created_at?: string
    /**
     * Date of last update to webhook.
     * In ISO 8601 format, UTC time, to the second, with T as a delimiter between the date and time.
     */
    updated_at?: string
  }
  /**
   * Object that specifies the settings and properties for the form's welcome screen.
   */
  export interface WelcomeScreen {
    /**
     * Readable name you can use to reference the welcome screen.
     */
    ref?: string
    /**
     * Title for the welcome screen.
     */
    title?: string
    /**
     * Properties of a welcome screen
     */
    properties?: Properties.WelcomeScreen
    /**
     * Allows you to display images and videos.
     * Available for welcome and thank you screens, as well as `date`, `dropdown`, `email`, `group`, `long_text`, `multiple_choice`,
     * `number`, `opinion_scale`, `payment`, `rating`, `short_text`, `statement`, `phone_number`, and `yes_no` fields.
     */
    attachment?: Attachment
  }
  /**
   * Typeform Workspace object.
   */
  export interface Workspace {
    /**
     * Unique identifier for the workspace.
     */
    id?: string
    /**
     * Name of the workspace.
     */
    name?: string
    /**
     * If the default workspace, `true`. Otherwise, `false`.
     */
    default?: boolean
    /**
     * If the workspace is shared with a team, `true`. Otherwise, `false`.
     */
    shared?: boolean
    forms?: {
      /**
       * Link to typeforms in the workspace.
       */
      href?: string
      /**
       * Number of typeforms in the workspace.
       */
      count?: number
    }
    self: {
      /**
       * Link to the workspace.
       */
      href?: string
    }
    /**
     * ID in the ULID format of the account where workspace belongs to.
     */
    account_id?: string
    members: {
      name: string
      email: string
      role: 'owner' | 'member'
    }[]
  }
}
