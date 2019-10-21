module.exports = {
  shortNames: [ 'en' ],
  longNameSe: 'Engelska',
  longNameEn: 'English',
  messages: {
    /**
     * General stuff
     */
    date_format_short: '%d-%b-%Y',

    /**
     * Error messages
     */

    error_not_found: 'Sorry, we can\'t find your requested page',
    error_generic: 'Something went wrong on the server, please try again later.',

    /**
     * Message keys
     */
    service_name: 'Course syllabus pdf-converter',

    example_message_key: 'This is an english translation of a label',

    button_label_example: 'Click me to send data to server!',

    field_text_example: 'Data to be sent to API',

    field_label_get_example: 'My modelData(Response from api call GET): ',
    field_label_post_example: 'My modelData(Response from api call POST): ',

    lang_block_id: '1.77273',
    locale_text: 'Course information in English',

    site_name: 'Kursplan',
    host_name: 'KTH'
  },
  courseInformationLabels: {
    label_course_syllabus: 'Course Syllabus',
    label_course_syllabus_valid_from: 'Valid from',
    label_programme_year: 'year ',
    label_course_intro: 'Intoduction',
    label_course_prepare: 'Prepare',
    label_course_during: 'During course',
    label_course_finalize: 'Finalize course',
    label_course_other: 'Contact and additional information',
    label_postgraduate_course: 'Postgraduate courses at ',
    label_last_exam: 'Last planned examination: '
  },
  courseInformation: {
    course_title: 'Title english',
    course_other_title: 'Title swedish',
    course_code: 'Course code',
    course_credits: 'Credits',
    course_grade_scale: 'Grading scale',
    course_goals: 'Intended learning outcomes',
    course_content: 'Course contents',
    course_disposition: 'Disposition',
    course_eligibility: 'Specific prerequisites',
    course_requirments_for_final_grade: 'Other requirements for final grade',
    course_literature: 'Course literature',
    course_literature_comment: '',
    course_examination_comments: '',
    course_examination: 'Examination',
    course_valid_from: 'Valid from',
    course_main_subject: 'Main field of study',
    course_language: 'Language of instruction',
    course_required_equipment: 'Equipment',
    course_level_code: 'Education cycle',
    course_level_code_label: {
      PREPARATORY: 'Pre-university level',
      BASIC: 'First cycle',
      ADVANCED: 'Second cycle',
      RESEARCH: 'Third cycle'
    },
    course_department: 'Offered by',
    course_contact_name: 'Contact ',
    course_suggested_addon_studies: 'Recommended prerequisites',
    course_supplemental_information_url: 'Supplementary information link',
    course_supplemental_information_url_text: 'Supplementary information link text',
    course_supplemental_information: 'Supplementary information ',
    course_examiners: 'Examiner',
    course_recruitment_text: 'Abstract',
    course_ethical: 'Ethical approach',
    course_ethical_text: "<li>All members of a group are responsible for the group's work.</li><li>In any assessment, every student shall honestly disclose any help received and sources used.</li><li>In an oral assessment, every student shall be able to present and answer questions about the entire assignment and solution.</li>",
    course_grade_label: 'Grading scale',
    course_language_default_text: 'Language of instruction is specified in the course offering information in the course and programme directory.',
    course_establishment: 'Establishment',
    course_decision_to_discontinue: 'Decision to discontinue this course',
    course_transitional_reg: 'Transitional regulations',
    course_additional_regulations: 'Additional regulations',
    course_short_semester: {
      1: 'Spring ',
      2: 'Autumn '
    }
  },
  course_pdf_footer_string: {
    for_code: 'Course syllabus for ',
    valid_from: ' valid from ',
    semester: ['Summer ', 'Spring ', 'Autumn '],
    edition: ', edition '
  },
  courseRoundInformation: {
    round_application_code: 'Application code',
    round_max_seats: 'Number of places',
    round_part_of_programme: 'Part of programme',
    round_responsibles: 'Course responsible',
    round_end_date: 'End date',
    round_start_date: 'Start date',
    round_teacher: 'Teacher',
    round_target_group: 'Target group',
    round_short_name: 'Short name',
    round_periods: 'Periods',
    round_schedule: 'Schedule',
    round_course_term: 'Start semester',
    round_course_place: 'Course place',
    round_tutoring_form: 'Form of study',
    round_tutoring_form_label: {
      NML: 'Normal',
      DST: 'Distance',
      ITD: 'IT based distance'
    },
    round_tutoring_language: 'Language of instruction',
    round_campus: 'Campus',
    round_tutoring_time: 'Tutoring time',
    round_tutoring_time_label: {
      DAG: 'Daytime',
      KVA: 'Evenings',
      KVÄ: 'Evenings',
      VSL: 'Weekends'
    },
    round_type: 'Type of round',
    round_time_slots: 'Planned timeslots',
    round_application_link: 'Application link'
  }
}
